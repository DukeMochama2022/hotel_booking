import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./configs/database.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";

connectDB();
connectCloudinary();

const app = express();
app.use(cors()); //connecting backend to frontend

//middleware
app.use(express.json());
app.use(clerkMiddleware());

//Api to listen to clerk webhooks
app.use("/api/clerk", clerkWebhooks);

app.get("/", (req, res) => {
  res.send("API is working");
});

//api routes
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
