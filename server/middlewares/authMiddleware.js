import User from "../models/User.js";

//check if user is authenticated
export const protect = async (req, res, next) => {
  const { userId } = req.auth;
  if (!userId) {
    res.status(401).json({ success: false, message: "Not authorized" });
  } else {
    const user = await User.findById(userId);
    req.user = user;
    next();
  }
};
