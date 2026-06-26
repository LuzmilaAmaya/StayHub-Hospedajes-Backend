import { Router } from "express";
import { upload } from "../config/multer.js";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);
router.use(authorize("admin"));

router.get("/", getUsers);

router.get("/:id", getUserById);

router.put(
  "/:id",
  upload.single("photo"),
  updateUser
);

router.delete("/:id", deleteUser);

export default router;