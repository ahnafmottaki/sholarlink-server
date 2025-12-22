import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { AppError } from "../lib/AppError";
import { asyncHandler } from "../lib/asyncHandler";
import { AdminModel } from "../models/admin.model";
import { AgentModel } from "../models/agent.model";
const getUser = async (role: "admin" | "agent", _id: string) => {
  switch (role) {
    case "admin":
      const admin = await AdminModel.findById(_id);
      return admin;
    case "agent":
      const agent = await AgentModel.findById(_id);
      return agent;
    default:
      throw new AppError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND);
  }
};

export const verifyRole = (role: "admin" | "agent") => {
  return asyncHandler(async (req, res, next) => {
    const user = (req as any).user;
    if (!user) {
      return next(
        new AppError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED),
      );
    }
    const userInstance = await getUser(user.role, user._id);
    if (!userInstance) {
      return next(
        new AppError(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED),
      );
    }
    if (userInstance.role !== role) {
      return next(new AppError(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN));
    }
    next();
  });
};
