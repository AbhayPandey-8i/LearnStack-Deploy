import mongoose, { connect } from "mongoose";

const connectDB = async () => {
  try {
     await mongoose.connect(process.env.MONGO_URI);
     console.log("MongoDB Connected Successfully!!");
     console.log("Connected to DB:", mongoose.connection.name);
     console.log("Connected to host:", mongoose.connection.host);
  } catch (error) {
    console.log(error)
  }
}

export default connectDB