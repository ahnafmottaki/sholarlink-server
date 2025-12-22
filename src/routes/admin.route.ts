import express from "express";
import { getAdminDashboard } from "../controllers/admin.controller";
import { verifyJwt } from "../middlewares/verifyJwt";
import { verifyRole } from "../middlewares/verifyRole";

const router = express.Router();

router.use(verifyJwt, verifyRole("admin"));
router.get("/", getAdminDashboard);
// router.get("/agents", getAgents);

export default router;
