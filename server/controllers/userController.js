import User from "../models/User.js";

export const userData = async (req, res) => {
  try {
    const role = req.user.role;
    const recentSearchCities = req.user.recentSearchCities;
    res.status(200).json({ success: true, role, recentSearchCities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//store user recent searched cities
export const storeRecentSearchedCities = async (req, res) => {
  try {
    const { recentSearchCity } = req.body;
    const user = req.user;

    if (!recentSearchCity) {
      return res
        .status(400)
        .json({ success: false, message: "City is required" });
    }

     // Remove duplicates
     user.recentSearchCities = user.recentSearchCities.filter(
      (city) => city !== recentSearchCity
    );

    if (user.recentSearchCities.length < 3) {
      user.recentSearchCities.push(recentSearchCity);
    } else {
      user.recentSearchCities.shift();
      user.recentSearchCities.push(recentSearchCity);
    }

    await user.save();
    res.status(200).json({ success: true, message: "City added" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
