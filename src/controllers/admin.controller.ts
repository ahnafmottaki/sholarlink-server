import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ApiResponse } from "../lib/ApiResponse";
import { asyncHandler } from "../lib/asyncHandler";
import adminService from "../services/admin.service";

export const getAdminDashboard = asyncHandler((req, res, next) => {
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK).sendResponse(res);
});

export const getAgents = asyncHandler(async (req, res, next) => {
  const agents = await adminService.getAgents();
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK, agents).sendResponse(res);
});
