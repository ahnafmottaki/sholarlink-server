import { RequestHandler } from "express";
import { agentRegisterSchema, loginSchema } from "../zod/auth.schema";
import { _ZodType } from "zod";
import { asyncHandler } from "../lib/asyncHandler";
import { AppError } from "../lib/AppError";
import { StatusCodes } from "http-status-codes";

const getValidated = (schema: _ZodType): RequestHandler => {
  return asyncHandler((req, res, next) => {
    console.log(req.body);
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const error = result.error.issues[0].message;
      next(new AppError(StatusCodes.BAD_REQUEST, error));
    }
    next();
  });
};

const validateRegisterInput = getValidated(agentRegisterSchema);
const validateLoginInput = getValidated(loginSchema);

export { validateRegisterInput, validateLoginInput };
