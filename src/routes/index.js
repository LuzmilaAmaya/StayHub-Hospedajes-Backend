import { Router } from "express";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import reservationRoutes from "./reservation.routes.js";
import roomRoutes from "./rooms.routes.js";
import contactRoutes from "./contact.routes.js";
import paymentRoutes from "./payment.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/reservations", reservationRoutes);
router.use("/rooms", roomRoutes);
router.use("/contacts", contactRoutes);
router.use("/payments", paymentRoutes);

export default router;
