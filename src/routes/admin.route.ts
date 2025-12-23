import express from "express";
import {
  getAdminDashboard,
  getAgent,
  getAgents,
} from "../controllers/admin.controller";
import { verifyJwt } from "../middlewares/verifyJwt";
import { verifyRole } from "../middlewares/verifyRole";

const router = express.Router();

router.use(verifyJwt, verifyRole("admin"));

router.get("/", getAdminDashboard);

router.get("/agents", getAgents);

router.get("/agents/:id", getAgent);

export default router;
