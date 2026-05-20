import { Router } from "express";
import {
  createReservation,
  getReservations,
  getReservationById,
  getAllReservations,
  cancelReservation,
  updateReservation,
} from "../controllers/reservation.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();


router.post("/", authenticate, createReservation);
router.get("/my", authenticate, getReservations);
router.patch("/:id/cancel", authenticate, cancelReservation);

router.put("/:id", authenticate, updateReservation);
router.get("/", authenticate, authorize("admin", "reception"), getAllReservations);
router.get("/:id", authenticate, authorize("admin", "reception"), getReservationById);

export default router;