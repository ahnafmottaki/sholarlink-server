import express from "express";
import { signup } from "../controllers/auth.controller";
import { validateRegisterInput } from "../middlewares/validationMiddleware";
import upload from "../lib/multer";
const router = express.Router();

router.post(
  "/register",
  upload.single("document"),
  validateRegisterInput,
  signup,
);
//
export default router;
