import { Router } from "express";
import {
  createReservation,
  getReservations,
  getReservationById,
  cancelReservation,
} from "../controllers/reservation.controller.js";

const router = Router();

router.post("/", createReservation);
router.get("/", getReservations);
router.get("/:id", getReservationById);
router.patch("/:id/cancel", cancelReservation);

export default router;
