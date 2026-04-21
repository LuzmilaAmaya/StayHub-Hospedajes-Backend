import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

export const registerService = async (data) => {
  const exists = await User.findOne({ email: data.email });
  if (exists) throw new Error("El usuario ya existe");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);

  const adminEmail = "admin@stayhub.com";

  const role = data.email === adminEmail ? "admin" : "guest";

  const user = await User.create({
    ...data,
    password: hashedPassword,
    role,
  });

  const token = generateToken(user);
  return { user, token };
};
export const loginService = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) throw new Error("Credenciales invalidas");

  if (!user.isActive) {
    throw new Error("Tu cuenta fue deshabilitada");
  }

  if (!user.password) {
    throw new Error("Inicia sesion con Google");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Credenciales invalidas");

  const token = generateToken(user);
  return { user, token };
};