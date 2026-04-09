import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { googleAuth } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleAuth);

export default router;
