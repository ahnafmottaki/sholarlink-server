import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { AppError } from "../lib/AppError";
import { asyncHandler } from "../lib/asyncHandler";
import authService from "../services/auth.service";
import { AgentRegister } from "../types/auth.types";
import { ApiResponse } from "../lib/ApiResponse";

export const signup = asyncHandler(async (req, res, next) => {
  throw new AppError(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST);
  // const document = req.file;
  // const agent: AgentRegister = req.body;
  // if (!document) {
  //   throw new AppError(StatusCodes.BAD_REQUEST, "document not found");
  // }
  // await authService.registerAgent(agent, document);
  // new ApiResponse(StatusCodes.CREATED, "Registration Successful").sendResponse(
  //   res,
  // );
});
