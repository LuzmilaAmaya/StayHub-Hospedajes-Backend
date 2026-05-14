import { Router } from "express";
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
} from "../controllers/room.controller.js";

import { authenticate, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getRooms);
router.get("/:id", getRoom);


router.post("/", authenticate, authorize("admin"), createRoom);
router.put("/:id", authenticate, authorize("admin"), updateRoom);
router.delete("/:id", authenticate, authorize("admin"), deleteRoom);

export default router;