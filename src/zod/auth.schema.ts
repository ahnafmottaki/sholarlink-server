import z from "zod";
import { ACCOUNT_TYPES } from "../constants/document-types";

const loginSchema = z.object({
  username: z.string().min(3, "username is required"),
  password: z.string().min(6, "password must be at least 6 characters"),
});

const baseAgentSchema = loginSchema.extend({
  contactNo: z
    .string()
    .min(10, "contact number must be at least 10 characters"),
  country: z.string().min(1, "country is required"),
  name: z.string().min(3, "full name is required"),
  email: z.email("invalid email address"),
  address: z.string().min(1, "address is required"),
});

const individualSchema = baseAgentSchema.extend({
  accountType: z.literal("individual"),
  documentType: z.enum(Object.keys(ACCOUNT_TYPES.individual)),
});
const organizationSchema = baseAgentSchema.extend({
  accountType: z.literal("organization"),
  orgName: z.string().min(3, "organization name is required"),
  documentType: z.enum(Object.keys(ACCOUNT_TYPES.organization)),
});

const agentRegisterSchema = z.discriminatedUnion("account_type", [
  individualSchema,
  organizationSchema,
]);

export {
  agentRegisterSchema,
  individualSchema,
  organizationSchema,
  loginSchema,
};
