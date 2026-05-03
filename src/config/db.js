import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log("Base conectada:", mongoose.connection.name);
  } catch (error) {
    console.error("Error conectando MongoDB", error);
  }
};