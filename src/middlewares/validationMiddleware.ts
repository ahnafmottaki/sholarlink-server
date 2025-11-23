import { RequestHandler } from "express";
import { agentRegisterSchema } from "../zod/create-agent";
import { _ZodType } from "zod";

const getValidated = (schema: _ZodType): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const error = result.error.message;
      throw new Error(error);
    }
    next();
  };
};

const validateRegisterInput = getValidated(agentRegisterSchema);

export { validateRegisterInput };
