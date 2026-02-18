import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
   console.log("Base conectada:", mongoose.connection.name);
  } catch (error) {
    console.error("Error conectando MongoDB", error);
    process.exit(1);
  }
};
