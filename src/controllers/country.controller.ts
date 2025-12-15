import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ApiResponse } from "../lib/ApiResponse";
import { asyncHandler } from "../lib/asyncHandler";
import Country from "../models/country.model";

export const getCountries = asyncHandler(async (req, res, next) => {
  const countries = await (Country as any).getCountries();
  new ApiResponse(StatusCodes.OK, ReasonPhrases.OK, countries).sendResponse(
    res,
  );
});
