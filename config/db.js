import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url1 = process.env.MONGOURL;

export const connectDB = async () => {
  try {
    await mongoose.connect(url1);
    console.log("Database Connected");
  } catch (error) {
    console.log(error.message);
  }
};

