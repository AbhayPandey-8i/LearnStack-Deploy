import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/dbConnect.js";
import userRoute from "./routes/user.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config({});
connectDB()

const app = express();

const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

//api
app.use("/api/v1/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
}
  )