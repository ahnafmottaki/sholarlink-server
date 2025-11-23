import { RequestHandler } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const notFound: RequestHandler = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    error: ReasonPhrases.NOT_FOUND,
  });
};

export default notFound;
