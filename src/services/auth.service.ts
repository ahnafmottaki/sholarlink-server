import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { env } from "../config/env";
import { AgentRegister } from "../types/auth.types";
import { AgentModel } from "../models/agent.model";
import { AppError } from "../lib/AppError";
import { StatusCodes } from "http-status-codes";
import storageService from "./storage.service";
import { AdminModel } from "../models/admin.model";
import { Response } from "express";

class authService {
  async registerAgent(agentRegistry: AgentRegister, file: Express.Multer.File) {
    const { username, email, accountType, documentType } = agentRegistry;
    const isExists = await AgentModel.isExists(username, email);
    if (isExists) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Agent already exists");
    }
    const filePath = storageService.buildRegistryDocName(
      username,
      accountType,
      documentType,
    );
    await storageService.uploadFile(file, filePath);
    const newAgent = new AgentModel({
      ...agentRegistry,
      documentPath: filePath,
    });
    await newAgent.hashPassword();
    await newAgent.save();

    // const agent = new AgentModel(payload, filepath);
    // await agent.hashPassword();
    // console.log(agent.toDocument());
    // await AgentRepo.createAgent(agent.toDocument());
    // return agent;
  }

  async loginAgent(username: string, password: string) {
    const agent = await AgentModel.findByUsername(username);
    if (!agent)
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Invalid username or password",
      );

    const isValid = await bcrypt.compare(password, agent.password);
    if (!isValid)
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "Invalid username or password",
      );

    if (agent.status === "pending") {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Verification pending, please check your email for confirmation",
      );
    }
    if (agent.status === "rejected") {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Rejected application, please check your email for more information",
      );
    }

    const token = this.signPayload({
      _id: agent._id.toString(),
      role: agent.role,
      username: agent.username,
    });

    return { agent, token };
  }

  async adminLogin(username: string, password: string) {
    const admin = await AdminModel.findByUsername(username);
    if (!admin) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Invalid username or password",
      );
    }
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        "Invalid username or password",
      );
    }
    const token = this.signPayload({
      _id: admin._id.toString(),
      role: admin.role,
      username: admin.username,
    });
    return { admin, token };
  }

  async logout(res: Response) {
    // clear the cookie
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      maxAge: 0,
      sameSite: "lax",
    });
  }

  signPayload(payload: Record<string, unknown>) {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as unknown as number,
    });
  }
}

export default new authService();
