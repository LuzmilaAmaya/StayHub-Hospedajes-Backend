import { Router } from "express";
import reservationRoutes from "./reservation.routes.js";

const router = Router();

router.use("/reservations", reservationRoutes);

export default router;
