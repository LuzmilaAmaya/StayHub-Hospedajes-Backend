import { Router } from "express";
import reservationRoutes from "./src/routes/reservation.routes.js";

const router = Router();

router.use("/reservations", reservationRoutes);

export default router;
