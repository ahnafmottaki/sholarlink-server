import { RequestHandler } from "express";
import { agentRegisterSchema, loginSchema } from "../zod/auth.schema";
import { _ZodType } from "zod";
import { asyncHandler } from "../lib/asyncHandler";
import { AppError } from "../lib/AppError";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Country from "../models/country.model";

const getValidated = (schema: _ZodType): RequestHandler => {
  return asyncHandler((req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const error = result.error.issues[0].message;
      next(new AppError(StatusCodes.BAD_REQUEST, error));
    }
    next();
  });
};

const validateRegisterInput = [
  getValidated(agentRegisterSchema),
  asyncHandler(async (req, res, next) => {
    const countryId: string = req.body.country;
    if (!mongoose.isValidObjectId(countryId)) {
      return next(new AppError(StatusCodes.BAD_REQUEST, "Invalid country"));
    }
    const country = await Country.findById(countryId);
    console.log("got country", country);
    if (country) {
      return next();
    }
    return next(new AppError(StatusCodes.BAD_REQUEST, "Invalid country"));
  }),
];

const validateLoginInput = getValidated(loginSchema);

export { validateRegisterInput, validateLoginInput };
