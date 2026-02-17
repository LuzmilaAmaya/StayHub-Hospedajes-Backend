import { Router } from "express";
import {
  createReservation,
  getReservations,
  getReservationById,
  cancelReservation,
} from "../controllers/reservation.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createReservation);
router.get("/", authMiddleware, getReservations);
router.get("/:id", authMiddleware, getReservationById);
router.patch("/:id/cancel", authMiddleware, cancelReservation);

export default router;
