import { ObjectId } from "mongodb";
import z from "zod";
import {
  AgentRegisterType,
  individualSchema,
  organizationSchema,
} from "../zod/auth.schema";

export type ModelExtraProperties = {
  _id: ObjectId;
  role: "agent";
  document_path: string;
  created_at: Date;
  updated_at: Date;
  student_profiles: any[];
  status: "pending" | "approved" | "rejected";
};

export type IndividualAgent = z.infer<typeof individualSchema> &
  ModelExtraProperties;
export type OrganizationAgent = z.infer<typeof organizationSchema> &
  ModelExtraProperties;
export type Agent = IndividualAgent | OrganizationAgent;

export class AgentModel {
  public agent: Agent;
  constructor(partial: AgentRegisterType, document_path: string) {
    const base: ModelExtraProperties = {
      _id: new ObjectId(),
      role: "agent",
      created_at: new Date(),
      updated_at: new Date(),
      document_path,
      status: "pending",
      student_profiles: [],
    };
    this.agent = {
      ...base,
      ...partial,
    };
  }

  async hashPassword() {
    const bcrypt = await import("bcryptjs");
    this.agent.password = await bcrypt.hash(this.agent.password, 10);
    return this;
  }

  getJwtPayload() {
    return {
      _id: this.agent._id.toString(),
      role: this.agent.role,
      username: this.agent.username,
    };
  }

  toDocument() {
    return {
      ...this.agent,
    };
  }
}
