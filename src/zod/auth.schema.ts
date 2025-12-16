import z from "zod";
import { ACCOUNT_TYPES } from "../constants/document-types";

const loginSchema = z.object({
  username: z.string().min(3, "username is required"),
  password: z.string().min(6, "password must be at least 6 characters"),
});

const baseAgentSchema = loginSchema.extend({
  contact_no: z
    .string()
    .min(10, "contact number must be at least 10 characters"),
  country: z.string().min(1, "country is required"),
  name: z.string().min(3, "full name is required"),
  email: z.email("invalid email address"),
  address: z.string().min(1, "address is required"),
});

const individualSchema = baseAgentSchema.extend({
  account_type: z.literal("individual"),
  document_type: z.enum(Object.keys(ACCOUNT_TYPES.individual)),
});
const organizationSchema = baseAgentSchema.extend({
  account_type: z.literal("organization"),
  org_name: z.string().min(3, "organization name is required"),
  document_type: z.enum(Object.keys(ACCOUNT_TYPES.organization)),
});

const agentRegisterSchema = z.discriminatedUnion("account_type", [
  individualSchema,
  organizationSchema,
]);
type AgentRegisterType = z.infer<typeof agentRegisterSchema>;
export {
  agentRegisterSchema,
  AgentRegisterType,
  individualSchema,
  organizationSchema,
  loginSchema,
};
