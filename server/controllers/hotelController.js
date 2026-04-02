import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, contact, city } = req.body;
    const owner = req.user._id;
    //check if user already registered
    const hotel = await Hotel.findOne({ owner });
    if (hotel) {
      return res
        .status(409)
        .json({ success: false, message: "Hotel already registered" });
    }
    await Hotel.create({ name, address, contact, city, owner });
    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
