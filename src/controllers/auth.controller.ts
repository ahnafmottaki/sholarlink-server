import { StatusCodes } from "http-status-codes";
import { AppError } from "../lib/AppError";
import { asyncHandler } from "../lib/asyncHandler";

export const signup = asyncHandler((req, res, next) => {
  const document = req.file;
  if (!document) {
    throw new AppError(StatusCodes.BAD_REQUEST, "document not found");
  }

  res.status(500).json({
    error: "Server Error",
  });
});
