import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ApiResponse } from "../lib/ApiResponse";
import { withAuth } from "../lib/asyncHandler";
import agentService from "../services/agent.service";
import { StudentInput } from "../types/student.types";
import { AppError } from "../lib/AppError";

export const getDashboard = withAuth(async (req, res, next) => {
  agentService.getAgentDashboard(req.user._id);
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK).sendResponse(res);
});

export const createProfile = withAuth(async (req, res, next) => {
  const { _id } = req.user;
  const files = req.files as any;
  const passport = files?.["passport"]?.[0] as Express.Multer.File;
  const transcripts = files?.["transcripts"]?.[0] as Express.Multer.File;
  const photo = files?.["photo"]?.[0] as Express.Multer.File;
  if (!passport || !transcripts || !photo) {
    next(new AppError(StatusCodes.BAD_REQUEST, "Missing required files"));
    return;
  }
  const studentInput: StudentInput = req.body;

  await agentService.createStudentProfile(_id, studentInput, {
    passport,
    transcripts,
    photo,
  });
  new ApiResponse(
    StatusCodes.CREATED,
    "profile created successfully",
  ).sendResponse(res);
});

export const getStudents = withAuth(async (req, res, next) => {
  const agentId = req.user._id;
  const students = await agentService.getStudents(agentId);

  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK, students).sendResponse(res);
});

export const getStudent = withAuth(async (req, res, next) => {
  const agentId = req.user._id;
  const studentId = req.params._id;
  const student = await agentService.getStudent(agentId, studentId);
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK, student).sendResponse(res);
});
