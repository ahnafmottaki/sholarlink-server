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
  is_approved: boolean;
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
      is_approved: false,
      student_profiles: [],
    };
    this.agent = {
      ...base,
      ...partial,
    };
  }

  async hashPassword() {
    // lazy import to avoid bringing bcrypt into files that don't need it
    const bcrypt = await import("bcryptjs");
    // mutate underlying doc.password
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    // For DB insertion/updates: keep date objects (mongodb accepts Date)
    return {
      ...this.agent,
    };
  }
}
