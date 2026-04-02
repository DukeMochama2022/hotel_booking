import express from "express";
import {
  storeRecentSearchedCities,
  userData,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/", protect, userData);
userRouter.post("/store-recent-search", protect, storeRecentSearchedCities);

export default userRouter;
