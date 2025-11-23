import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { env } from "../config/env";
import { AgentModel } from "../models/agent.model";
import * as agentRepo from "../db/agent.repo";
import { AgentRegisterType } from "../zod/auth.schema";
import { AppError } from "../lib/AppError";
import { StatusCodes } from "http-status-codes";
import storageService from "./storage.service";

class authService {
  constructor() {}

  async registerAgent(payload: AgentRegisterType, file: Express.Multer.File) {
    const email =
      payload.account_type === "individual"
        ? payload.email
        : payload.organization_email;
    const isExist = await agentRepo.isExists(payload.username, email);
    if (isExist) {
      throw new AppError(
        StatusCodes.CONFLICT,
        "Username or email already exists",
      );
    }
    const filepath = `users/${payload.username}-${payload.account_type}-${payload.document_type}-${new Date().toISOString()}.pdf`;
    await storageService.uploadFile(file, filepath);
    const agent = new AgentModel(payload, filepath);
    await agent.hashPassword();
    await agentRepo.createAgent(agent.toDocument());
    return agent;
  }

  async loginAgent(username: string, password: string) {
    const agent = await agentRepo.findAgentByUsername(username);
    if (!agent) return null;

    const isValid = await bcrypt.compare(password, (agent as any).password);
    if (!isValid) return null;

    const token = this.signPayload({
      _id: agent._id.toString(),
      role: agent.role,
      username: agent.username,
    });

    return { agent, token };
  }

  signPayload(payload: Record<string, unknown>) {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: Number(env.JWT_EXPIRES_IN),
    });
  }
}

export default new authService();
