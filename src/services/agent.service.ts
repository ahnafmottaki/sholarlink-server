import { StatusCodes } from "http-status-codes";
import { agentCollection } from "../config/db.config";
import { AppError } from "../lib/AppError";
import { Agent, AgentSchema } from "../zod/create-agent";
import { AgentModel } from "../models/agent.model";
import { Response } from "express";
import jwt from "jsonwebtoken";

class AgentService {
  static async isExists(username: string, email: string) {
    const agent = await agentCollection.findOne({
      $or: [{ username }, { email }],
    });
    return !!agent;
  }
  static async insertAgent(agent: AgentSchema, filename: string) {
    const document = await AgentModel.createAgent(agent, filename);
    const result = await agentCollection.insertOne(document, {
      writeConcern: { w: "majority", wtimeout: 10000, j: true },
    });
    if (!result.insertedId)
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to insert agent",
      );
    return document;
  }

  static setCookie(res: Response, agent: Agent) {
    const payload = AgentModel.getJWTPayload(agent);
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

  static getDocName(agent: AgentSchema) {
    const filename = `${agent.username}-${agent.account_type}-${agent.document_type}.pdf`;
    return filename;
  }
}

export default AgentService;
