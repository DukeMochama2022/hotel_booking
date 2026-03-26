import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./configs/database.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

connectDB();
const app = express();
app.use(cors()); //connecting backend to frontend

//middleware
app.use(express.json());
app.use(clerkMiddleware());

//Api to listen to clerk webhooks
app.use("/api/clerk", express.raw({ type: "application/json" }), clerkWebhooks);

app.get("/", (req, res) => {
  res.send("API is working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
