import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      documentId,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "El usuario ya existe",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let role = "guest";

    if (email === process.env.ADMIN_EMAIL) {
      role = "admin";
    }

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      documentId,
      role,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Usuario no encontrado",
      });
    }

    if (!user.password) {
      return res.status(400).json({
        message: "Este usuario usa Google",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Contraseña incorrecta",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, googleId, photo } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      let role = "guest";

      if (email === process.env.ADMIN_EMAIL) {
        role = "admin";
      }

      user = await User.create({
        fullName,
        email,
        googleId,
        photo,
        role,
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};