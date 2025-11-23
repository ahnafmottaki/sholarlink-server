import express from "express";
import upload from "../lib/multer";
import { validateRegisterInput } from "../middlewares/validationMiddleware";
import { download, signup } from "../controllers/agent.controller";

const router = express.Router();

router.post(
  "/register",
  upload.single("document"),
  validateRegisterInput,
  signup,
);

router.get("/download", download);

export default router;
