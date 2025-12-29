import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../types/authenticated";
const asyncHandler =
  (
    fn: (
      req: Request,
      res: Response,
      next: NextFunction,
    ) => Promise<unknown> | void,
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

const withAuth =
  (
    fn: (
      req: AuthenticatedRequest,
      res: Response,
      next: NextFunction,
    ) => Promise<unknown> | void,
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!("user" in req)) {
      throw Error("This handler must be user in authorized context");
    }
    Promise.resolve(fn(req as AuthenticatedRequest, res, next)).catch(next);
  };

export { asyncHandler, withAuth };
