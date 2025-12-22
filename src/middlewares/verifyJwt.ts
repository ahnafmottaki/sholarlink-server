import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { AppError } from "../lib/AppError";
import { asyncHandler } from "../lib/asyncHandler";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

const verifyJwt = asyncHandler((req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return next(
      new AppError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED),
    );
  }
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    console.log(decoded);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return next(
      new AppError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED),
    );
  }
});

export { verifyJwt };
