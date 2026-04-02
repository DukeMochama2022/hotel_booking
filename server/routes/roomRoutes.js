import express from "express";
import {
  createRoom,
  getOwnerRooms,
  getRooms,
  toggleRoomAvailabilty,
} from "../controllers/roomController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
const roomRouter = express.Router();

roomRouter.post("/create", upload.array("images", 4), protect, createRoom);
roomRouter.get("/", getRooms);
roomRouter.get("/owner", protect, getOwnerRooms);
roomRouter.post("/update-availability", protect, toggleRoomAvailabilty);

export default roomRouter;
