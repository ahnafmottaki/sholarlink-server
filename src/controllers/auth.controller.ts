import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { AppError } from "../lib/AppError";
import { asyncHandler } from "../lib/asyncHandler";
import authService from "../services/auth.service";
import { AgentRegister } from "../types/auth.types";
import { ApiResponse } from "../lib/ApiResponse";
import { setCookie } from "../lib/cookie";

export const signup = asyncHandler(async (req, res, next) => {
  const document = req.file;
  const agent: AgentRegister = req.body;
  if (!document) {
    throw new AppError(StatusCodes.BAD_REQUEST, "document not found");
  }
  await authService.registerAgent(agent, document);
  new ApiResponse(StatusCodes.CREATED, "Registration Successful").sendResponse(
    res,
  );
});

export const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const { agent, token } = await authService.loginAgent(username, password);
  setCookie(res, token);
  new ApiResponse(StatusCodes.OK, "Login Successful").sendResponse(res);
});

export const adminLogin = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const { token } = await authService.adminLogin(username, password);
  setCookie(res, token);
  new ApiResponse(StatusCodes.OK, "Login Successful").sendResponse(res);
});
