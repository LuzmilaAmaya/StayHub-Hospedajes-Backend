import { registerService, loginService } from "../services/auth.service.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const result = await registerService(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const result = await loginService(req.body); 
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
export const googleAuth = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const { fullName, email, googleId, photo } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        fullName,
        email,
        googleId,
        password: null,
        phone: null,
        documentId: null,
      });
    } else {
      user.googleId = googleId || user.googleId;
      user.fullName = fullName || user.fullName;

      await user.save();
    }
    console.log("JWT:", process.env.JWT_SECRET);
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({ user, token });
   } catch (error) {
    console.log(" ERROR GOOGLE BACKEND:", error); 
    res.status(500).json({ message: error.message });
  }
};
