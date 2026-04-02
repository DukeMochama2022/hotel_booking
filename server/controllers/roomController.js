import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";

//api to create a room for a hotel
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;
    const hotel = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotel)
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found" });

    if (!roomType || !pricePerNight) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No images uploaded" });
    }

    //upload images to cloudinaary
    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    //wait for all uploads to complete
    const images = await Promise.all(uploadImages);
    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
    });

    res
      .status(200)
      .json({ success: true, message: "Room created successifuly" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//api to get all rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//api to get all rooms for specific hotel
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel({ owner: req.auth.userId });
    const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate(
      "hotel"
    );
    return res.status(200).json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//api to toggle room availbility
export const toggleRoomAvailabilty = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();
    return res
      .status(200)
      .json({ success: true, message: "Room availabilty updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
