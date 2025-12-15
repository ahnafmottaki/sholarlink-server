import express from "express";
import { getAgents } from "../controllers/admin.controller";

const router = express.Router();

router.get("/agents", getAgents);

export default router;
