import z from "zod";
import {
  agentRegisterSchema,
  individualSchema,
  organizationSchema,
} from "../zod/auth.schema";

export type IndividualRegister = z.infer<typeof individualSchema>;
export type OrganizationRegister = z.infer<typeof organizationSchema>;
export type AgentRegister = z.infer<typeof agentRegisterSchema>;
