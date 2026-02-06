import { Router } from "express";
import * as RoomController from "../controllers/room.controller.js";

const router = Router();

router.get("/", RoomController.getRooms);
router.get("/:id", RoomController.getRoom);
router.post("/", RoomController.createRoom);
router.put("/:id", RoomController.updateRoom);
router.delete("/:id", RoomController.deleteRoom);

export default router;
