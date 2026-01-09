import { Router } from "express";
import * as contactController from "../controllers/contact.controller.js";

const router = Router();

router.post("/", contactController.create);
router.get("/", contactController.getAll);
router.get("/:id", contactController.getById);
router.put("/:id", contactController.update);
router.delete("/:id", contactController.remove);

export default router;
