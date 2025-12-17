import express from "express";
import upload from "../lib/multer";
import { signup } from "../controllers/auth.controller";
import { validateRegisterInput } from "../middlewares/validationMiddleware";
const router = express.Router();

router.post(
  "/register",
  upload.single("document"),
  ...validateRegisterInput,
  signup,
);

// router.post("/login", validateLoginInput, login);

// router.post("/adminLogin", validateLoginInput, adminLogin);

export default router;
