import { RequestHandler } from "express";
import { AgentSchema } from "../zod/create-agent";
import { AppError } from "../lib/AppError";
import StorageService from "../services/storage.service";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import AgentService from "../services/agent.service";
import { ApiResponse } from "../lib/ApiResponse";
import { AgentModel } from "../models/agent.model";

export const signup: RequestHandler = async (req, res, next) => {
  const agent: AgentSchema = req.body;
  if (!req?.file) {
    return next(new AppError(StatusCodes.BAD_REQUEST, "File is required"));
  }
  const isExists = await AgentService.isExists(
    agent.username,
    agent.account_type === "individual"
      ? agent.email
      : agent.organization_email,
  );

  if (isExists)
    throw new AppError(StatusCodes.BAD_REQUEST, "Agent already exists");
  // uploading document to google cloud storage
  const filename = await StorageService.uploadFile(
    req.file,
    AgentService.getDocName(agent),
  );
  // adding to database
  const doc = await AgentService.insertAgent(agent, filename);
  //creating and setting jwt to cookie
  AgentService.setCookie(res, doc);

  new ApiResponse(
    StatusCodes.CREATED,
    ReasonPhrases.CREATED,
    AgentModel.toResponse(doc),
  ).sendResponse(res);
};

export const download: RequestHandler = (req, res, next) => {};
