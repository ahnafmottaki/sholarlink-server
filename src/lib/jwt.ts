import { Response } from "express";
import jwt from "jsonwebtoken";
import { Payload } from "../types/authenticated";

export function setCookie(res: Response, payload: Payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV! === "production",
    maxAge: 3600000,
    sameSite: "lax",
  });
}

export function clearCookie(res: Response) {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV! === "production",
    maxAge: 3600000,
    sameSite: "lax",
  });
}
