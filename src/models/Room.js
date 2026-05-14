import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["simple", "doble", "suite"],
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },
    images: {
      type: [String],
      required: true,
      validate: [(val) => val.length > 0, "Debe tener al menos una imagen"],
    },
    key: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["disponible", "reservada", "mantenimiento", "fuera_servicio"],
      default: "disponible",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Room", roomSchema);
