import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

type Payload = {
  _id: string;
  username: string;
  account_type: string;
  role: string;
};

type JWTPayload = Payload & JwtPayload;

type AuthenticatedRequest = Request & {
  user: JWTPayload;
};

export { Payload, JWTPayload, AuthenticatedRequest };
