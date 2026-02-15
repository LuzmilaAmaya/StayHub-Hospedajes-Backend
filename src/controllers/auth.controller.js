import { registerService, loginService } from "../services/auth.service.js";

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
    const { email, password } = req.body;
    const result = await loginService(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
