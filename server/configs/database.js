import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database connected successifully")
    );
    await mongoose.connect(`${process.env.MONGO_URI}/hotel_booking`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
