import { Router } from "express";
import {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoomById,
} from "../controllers/room.controller.js";

import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", getRooms);
router.get("/:id", getRoomById);


router.post("/", authenticate, authorize("admin"), createRoom);
router.put("/:id", authenticate, authorize("admin"), updateRoom);
router.delete("/:id", authenticate, authorize("admin"), deleteRoom);

export default router;