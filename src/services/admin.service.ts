import { StatusCodes } from "http-status-codes";
import { AgentModel } from "../models/agent.model";
import { AppError } from "../lib/AppError";
import storageService from "./storage.service";
import { buildRegistryDocName } from "../lib/gcs.lib";

class AdminService {
  async getAdminDashboard() {}

  async getAgent(id: string) {
    const agent = await AgentModel.findOne({ _id: id }, "-password -username")
      .populate("country")
      .exec();
    if (!agent) {
      throw new AppError(StatusCodes.NOT_FOUND, "Agent not found");
    }
    const documentUrl = await storageService.getSignedUrl(agent.documentPath);
    const { documentPath, ...rest } = agent.toObject();
    const agentWithUrl = { ...rest, documentUrl };
    console.log("getting hit: agentUrl");
    return agentWithUrl;
  }

  async getAgents() {
    const agents = await AgentModel.aggregate([
      {
        $addFields: {
          statusOrder: {
            $switch: {
              branches: [
                { case: { $eq: ["$status", "pending"] }, then: 1 },
                { case: { $eq: ["$status", "approved"] }, then: 2 },
                { case: { $eq: ["$status", "rejected"] }, then: 3 },
              ],
              default: 4,
            },
          },
        },
      },
      {
        $sort: {
          statusOrder: 1,
          createdAt: -1, // Secondary sort
        },
      },
      {
        $project: {
          statusOrder: 0,
          password: 0,
          role: 0,
          usename: 0,
          contactNo: 0,
          address: 0,
          documentType: 0,
          documentPath: 0,
        },
      },
    ]);
    return agents;
  }
}

export default new AdminService();
