import { ErrorRequestHandler } from "express";
import { AppError, isAppError } from "../lib/AppError";
import { StatusCodes } from "http-status-codes";

const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let errorMsg = "Something went wrong";
  console.log(error);
  if (isAppError(error)) {
    statusCode = error.statusCode;
    errorMsg = error.message;
  }
  res.status(statusCode).json({
    success: false,
    error: errorMsg,
  });
};

export default errorMiddleware;
