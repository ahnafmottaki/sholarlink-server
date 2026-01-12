import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ApiResponse } from "../lib/ApiResponse";
import { withAuth } from "../lib/asyncHandler";
import adminService from "../services/admin.service";
import { AppError } from "../lib/AppError";

export const getAdminDashboard = withAuth((req, res, next) => {
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK).sendResponse(res);
});

export const getAgents = withAuth(async (req, res, next) => {
  const agents = await adminService.getAgents();
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK, agents).sendResponse(res);
});

export const getAgent = withAuth(async (req, res, next) => {
  const id = req.params.id;
  if (!id) {
    return next(new AppError(StatusCodes.BAD_REQUEST, "Invalid agent id"));
  }
  const agent = await adminService.getAgent(id);
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK, agent).sendResponse(res);
});

export const updateAgentStatus = withAuth(async (req, res, next) => {
  const id = req.params.id;
  const status = req.query?.status as string;
  if (!id || !status) {
    return next(
      new AppError(StatusCodes.BAD_REQUEST, "Invalid agent id or status"),
    );
  }
  await adminService.updateAgentStatus(id, status);
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK).sendResponse(res);
});

export const getStudents = withAuth(async (req, res, next) => {
  const students = await adminService.getStudents();
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK, students).sendResponse(res);
});

export const getStudent = withAuth(async (req, res, next) => {
  const id = req.params._id;
  if (!id) {
    return next(new AppError(StatusCodes.BAD_REQUEST, "Invalid student id"));
  }
  const student = await adminService.getStudent(id);
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK, student).sendResponse(res);
});
