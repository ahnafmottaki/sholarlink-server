import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ApiResponse } from "../lib/ApiResponse";
import { asyncHandler } from "../lib/asyncHandler";
import adminService from "../services/admin.service";
import { AppError } from "../lib/AppError";

export const getAdminDashboard = asyncHandler((req, res, next) => {
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK).sendResponse(res);
});

export const getAgents = asyncHandler(async (req, res, next) => {
  const agents = await adminService.getAgents();
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK, agents).sendResponse(res);
});

export const getAgent = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new AppError(StatusCodes.BAD_REQUEST, "Invalid agent id"));
  }
  const agent = await adminService.getAgent(id);
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK, agent).sendResponse(res);
});
