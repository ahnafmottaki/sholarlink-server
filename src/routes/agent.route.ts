import express from "express";
import { createProfile, getDashboard } from "../controllers/agent.controller";
import { verifyJwt } from "../middlewares/verifyJwt";
import { verifyRole } from "../middlewares/verifyRole";
import { validateProfileInput } from "../middlewares/validationMiddleware";
import upload from "../lib/multer";

const router = express.Router();

router.use(verifyJwt, verifyRole("agent"));

router.get("/", getDashboard);

const uploadMiddleware = upload.fields([
  { name: "passport", maxCount: 1 },
  { name: "transcripts", maxCount: 1 },
  { name: "photo", maxCount: 1 },
]);

router.post("/", uploadMiddleware, validateProfileInput, createProfile);

export default router;
