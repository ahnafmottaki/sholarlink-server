import express from "express";
import { login, signup } from "../controllers/auth.controller";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middlewares/validationMiddleware";
import upload from "../lib/multer";
const router = express.Router();

router.post(
  "/register",
  upload.single("document"),
  validateRegisterInput,
  signup,
);

router.post("/login", validateLoginInput, login);
export default router;
