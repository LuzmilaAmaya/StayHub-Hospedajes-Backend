import { Router } from "express";
import {
  createPayment,
  confirmPayment,
} from "../controllers/payment.controller.js";

const router = Router();

router.post("/create-payment", createPayment);
router.post("/confirm-payment", confirmPayment);

export default router;