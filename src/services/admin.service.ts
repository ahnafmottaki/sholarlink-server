import { AgentRepo } from "../db";

class AdminService {
  async getAgents() {
    return AgentRepo.findAgents({
      _id: 1,
      full_name: 1,
      organization_name: 1,
      email: 1,
      country: 1,
      organization_email: 1,
      status: 1,
      account_type: 1,
      created_at: 1,
    });
  }
}

export default new AdminService();
