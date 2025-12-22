import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ApiResponse } from "../lib/ApiResponse";
import { asyncHandler } from "../lib/asyncHandler";

export const getAdminDashboard = asyncHandler((req, res, next) => {
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK).sendResponse(res);
});
