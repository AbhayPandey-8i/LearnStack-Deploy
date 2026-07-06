import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/dbConnect.js";
import userRoute from "./routes/user.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import courseRoute from "./routes/course.routes.js"
import mediaRoute from "./routes/media.routes.js"
import purchaseRoute from "./routes/purchaseCourse.routes.js"
import courseProgressRoute from "./routes/courseProgress.routes.js"
import { stripeWebhook } from "./controllers/coursePurchase.controller.js";
import path from "path"


dotenv.config({});
connectDB()

const PORT = process.env.PORT || 3000;
const app = express();

const _dirname = path.resolve()


// must come BEFORE express.json()
app.post("/api/v1/purchase/webhook", express.raw({ type: "application/json" }), stripeWebhook);


//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://learnstack-leaning-platform.onrender.com",
    credentials: true
}));

//api
app.use("/api/v1/media", mediaRoute)
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get("/*splat", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})


app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
}
  )