import { Router } from "express";
import {
  createReservation,
  getReservations,
  getReservationById,
  cancelReservation,
} from "../controllers/reservation.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();


router.post("/", authenticate, createReservation);
router.get("/my", authenticate, getReservations);
router.patch("/:id/cancel", authenticate, cancelReservation);


router.get("/", authenticate, authorize("admin", "reception"), getReservations);
router.get("/:id", authenticate, authorize("admin", "reception"), getReservationById);

export default router;