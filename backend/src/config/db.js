import mongoose from "mongoose";
import { ENV } from "./env.js";

export async function connectDB() {
  try {
    await mongoose.connect(ENV.MONGO_URI); 

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Error:", error.message);
    process.exit(1);
  }
}
