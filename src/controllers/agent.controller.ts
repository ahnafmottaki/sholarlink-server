import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ApiResponse } from "../lib/ApiResponse";
import { withAuth } from "../lib/asyncHandler";
import agentService from "../services/agent.service";
import { StudentInput } from "../types/student.types";

export const getDashboard = withAuth(async (req, res, next) => {
  agentService.getAgentDashboard(req.user._id);
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK).sendResponse(res);
});

export const createProfile = withAuth(async (req, res, next) => {
  console.log(req.body);
  console.log("Creating profile...");
  const files = req.files as any;
  const passport = files?.["passport"]?.[0] as Express.Multer.File;
  const transcripts = files?.["transcripts"]?.[0] as Express.Multer.File;
  const photo = files?.["photo"]?.[0] as Express.Multer.File;
  if (!passport || !transcripts || !photo) {
    new ApiResponse(
      StatusCodes.BAD_REQUEST,
      "Missing required files",
    ).sendResponse(res);
    return;
  }
  const studentInput: StudentInput = req.body;
  console.log(passport, transcripts, photo, studentInput);
  new ApiResponse(StatusCodes.CREATED, ReasonPhrases.CREATED).sendResponse(res);
});
