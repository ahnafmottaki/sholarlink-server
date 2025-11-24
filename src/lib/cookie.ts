import { Response } from "express";
import { env } from "../config/env";

export function setCookie(res: Response, token: string) {
  console.log("setting cookie");
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60,
    sameSite: "lax",
  });
}

export function clearCookie(res: Response) {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    maxAge: 3600000,
    sameSite: "lax",
  });
}
