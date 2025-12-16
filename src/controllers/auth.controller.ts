import { asyncHandler } from "../lib/asyncHandler";

export const signup = asyncHandler((req, res, next) => {
  console.log(req.body);
  res.status(500).json({
    error: "Server Error",
  });
});
