import express from "express";
const hotelRouter = express.Router();
import { registerHotel } from "../controllers/hotelController.js";
import { protect } from "../middlewares/authMiddleware.js";

hotelRouter.post("/", protect, registerHotel);

export default hotelRouter;
