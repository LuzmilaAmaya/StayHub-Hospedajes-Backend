import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("MONGO URI:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error DB:", error);
    process.exit(1);
  }
};
