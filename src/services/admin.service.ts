import { AgentModel } from "../models/agent.model";

class AdminService {
  async getAdminDashboard() {}

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
