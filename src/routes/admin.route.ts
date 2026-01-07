import express from "express";
import {
  getAdminDashboard,
  getAgent,
  getAgents,
  getStudents,
  updateAgentStatus,
} from "../controllers/admin.controller";
import { verifyJwt } from "../middlewares/verifyJwt";
import { verifyRole } from "../middlewares/verifyRole";

const router = express.Router();

router.use(verifyJwt, verifyRole("admin"));

router.get("/", getAdminDashboard);

router.get("/students", getStudents);

router.get("/agents", getAgents);

router.get("/agents/:id", getAgent);

router.patch("/agents/:id", updateAgentStatus);

export default router;
