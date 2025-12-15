import express from "express";
import upload from "../lib/multer";
import { signup } from "../controllers/auth.controller";
const router = express.Router();

router.post("/register", upload.single("document"), signup);

// router.post("/login", validateLoginInput, login);

// router.post("/adminLogin", validateLoginInput, adminLogin);

export default router;
