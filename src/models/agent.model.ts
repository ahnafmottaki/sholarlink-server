import mongoose from "mongoose";
import { ACCOUNT_TYPES } from "../constants/document-types";
import { Agent } from "../types/agent.types";

const agentSchema = new mongoose.Schema<Agent>(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minLength: 1,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
      minLength: 1,
    },
    name: {
      type: String,
      required: true,
      minLength: 1,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
      minLength: 1,
    },
    accountType: {
      type: String,
      enum: Object.keys(ACCOUNT_TYPES),
      required: true,
    },
    documentType: {
      type: String,
      required: true,
    },
    orgName: {
      type: String,
      minLength: 1,
    },
    documentPath: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const AgentModel = mongoose.model("Agent", agentSchema);
