import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import {
  Agent,
  AgentSchema,
  IndividualAgent,
  OrganizationAgent,
} from "../zod/create-agent";
import { Payload } from "../types/authenticated";

class AgentModel {
  static hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  static toResponse(agent: Agent) {
    const { _id, ...rest } = agent;
    return rest;
  }

  static getJWTPayload(agent: Agent): Payload {
    return {
      _id: agent._id.toString(),
      username: agent.username,
      account_type: agent.account_type,
      role: agent.role,
    };
  }

  static async createAgent(
    agent: AgentSchema,
    document_path: string,
  ): Promise<Agent> {
    const hashedPassword = await AgentModel.hashPassword(agent.password);
    if (agent.account_type === "individual") {
      const individual: IndividualAgent = {
        _id: new ObjectId(),
        username: agent.username,
        password: hashedPassword,
        contact_no: agent.contact_no,
        country: agent.country,
        address: agent.address,
        role: "agent",
        account_type: agent.account_type,
        full_name: agent.full_name,
        email: agent.email,
        document_type: agent.document_type,
        document_path: document_path,
        student_profiles: [],
        is_approved: false,
        created_at: new Date(),
        updated_at: new Date(),
      };
      return individual;
    }
    const organization: OrganizationAgent = {
      _id: new ObjectId(),
      username: agent.username,
      password: hashedPassword,
      contact_no: agent.contact_no,
      country: agent.country,
      address: agent.address,
      role: "agent",
      account_type: agent.account_type,
      organization_name: agent.organization_name,
      organization_email: agent.organization_email,
      person_in_charge: agent.person_in_charge,
      document_type: agent.document_type,
      document_path: document_path,
      student_profiles: [],
      is_approved: false,
      created_at: new Date(),
      updated_at: new Date(),
    };
    return organization;
  }
}

export { AgentModel };
