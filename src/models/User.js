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
      default: null,
    },

    googleId: {
      type: String,
      default: null,
    },

    photo: {
      type: String,
      default: null,
    },

    phone: {
      type: String,
      default: null,
    },

    documentId: {
      type: String,
      default: null,
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
  }
);

export default mongoose.model("User", UserSchema);