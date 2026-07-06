import Stripe from "stripe";
import {Course} from "../models/course.model.js"
import {CoursePurchase} from "../models/coursePurchase.model.js"
import { Lecture } from "../models/lecture.model.js"
import { User } from "../models/user.model.js"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    try {
        const userId = req.id;
        const {courseId} = req.body;

        const course = await Course.findById(courseId) 
        if (!course) return res.status(404).json({message:"Course not found!"})
            
        //create new course record
        const newPurchase = new CoursePurchase({
            courseId,
            userId,
            amount:course.coursePrice,
            status:"pending"
        }); 

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.courseTitle,
              images: [course.courseThumbnail],
            },
            unit_amount: course.coursePrice * 100, // Amount in paise (lowest denomination)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://learnstack-leaning-platform.onrender.com/course-progress/${courseId}`, // once payment successful redirect to course progress page
      //success_url: `http://localhost:5173/courses-detail/${courseId}`,
      cancel_url: `http://learnstack-leaning-platform.onrender.com/course-detail/${courseId}`,
      metadata: {
        courseId: courseId,
        userId: userId,
      },
      shipping_address_collection: {
        allowed_countries: ["IN"], // Optionally restrict allowed countries
      },
    });

    if (!session.url) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
    }

    // Save the purchase record
    newPurchase.paymentId = session.id;
    await newPurchase.save();
    console.log(session.url)
    return res.status(200).json({
      success: true,
      url: session.url, // Return the Stripe checkout URL
    });
        
    } catch (error) {
        console.log(error)
    }
}
export const stripeWebhook = async (req, res) => {
  let event;

  try {
    const signature = req.headers["stripe-signature"];
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

    // req.body must be the raw Buffer here (ensured by express.raw() on this route)
    event = stripe.webhooks.constructEvent(req.body, signature, secret);
  } catch (error) {
    console.error("❌ Webhook Validation Error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  // Handle the checkout session completed event
  if (event.type === "checkout.session.completed") {
    console.log("🎯 Webhook Success: checkout.session.completed triggered!");

    try {
      const session = event.data.object;

      const purchase = await CoursePurchase.findOne({
        paymentId: session.id,
      }).populate({ path: "courseId" });

      if (!purchase) {
        console.log("❌ Purchase record not found in DB for ID:", session.id);
        return res.status(404).json({ message: "Purchase not found" });
      }

      // Idempotency guard — Stripe may retry the same event
      if (purchase.status === "completed") {
        console.log("ℹ️ Purchase already marked completed, skipping.");
        return res.status(200).send();
      }

      if (session.amount_total) {
        purchase.amount = session.amount_total / 100;
      }

      purchase.status = "completed";
      await purchase.save();

      console.log("🔄 Database updated: Status is now COMPLETED!");

      if (purchase.courseId && purchase.courseId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourses: purchase.courseId._id } },
        { new: true }
      );

      await Course.findByIdAndUpdate(
        purchase.courseId._id,
        { $addToSet: { enrolledStudents: purchase.userId } },
        { new: true }
      );

      console.log("👥 Student successfully enrolled in Course!");
    } catch (error) {
      console.error("❌ Error inside webhook business logic:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  res.status(200).send();
};

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" })

    const purchased = await CoursePurchase.findOne({ userId, courseId })
    if (!course) {
      return res.status(404).json({ message: "course not found!" })
    }

    return res.status(200).json({
      course,
      purchased: !!purchased,   //true if purchased, false otherwise
    })
  } catch (error) {
    console.log(error)
  }
}

export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({ status: "completed" }).populate("courseId")
    if (!purchasedCourse) {
      return res.status(404).json({
        purchasedCourse: []
      })
    }
    return res.status(200).json({
      purchasedCourse
    })
  } catch (error) {
    console.log(error)
  }
}
