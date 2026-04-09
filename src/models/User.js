import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      default: null, // 🔥 importante
    },

    googleId: {
      type: String, // 🔥 nuevo campo
    },

    phone: {
      type: String,
      default: null, // 🔥 ya no requerido
    },

    documentId: {
      type: String,
      default: null, // 🔥 ya no requerido
    },

    role: {
      type: String,
      enum: ["guest", "admin", "reception"],
      default: "guest",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", UserSchema);
