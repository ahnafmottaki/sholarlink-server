import { asyncHandler } from "../lib/asyncHandler";
import { AgentRegisterType, loginSchema } from "../zod/auth.schema";
import authService from "../services/auth.service";
import { ApiResponse } from "../lib/ApiResponse";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { AppError } from "../lib/AppError";

export const signup = asyncHandler(async (req, res, next) => {
  const parsed: AgentRegisterType = req.body;
  const file = req?.file;
  if (!file) {
    throw new AppError(StatusCodes.BAD_REQUEST, "file is required");
  }
  await authService.registerAgent(parsed, file);
  new ApiResponse(StatusCodes.CREATED, ReasonPhrases.CREATED).sendResponse(res);
});

export const login = asyncHandler(async (req, res, next) => {
  const parsed = loginSchema.parse(req.body);
  const result = await authService.loginAgent(parsed.username, parsed.password);
  if (!result) {
    return next(new AppError(StatusCodes.UNAUTHORIZED, "Invalid credentials"));
  }
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK, {
    token: result.token,
    user: result.agent,
  }).sendResponse(res);
});
