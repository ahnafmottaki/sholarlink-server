import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import {
  Account,
  DocumentTypes,
  ACCOUNT_TYPES,
  Status,
  STATUS,
} from "../constants/agent.constants";

interface IAgent {
  username: string;
  password: string;
  country: mongoose.Schema.Types.ObjectId;
  contactNo: string;
  role: "agent";
  name: string;
  email: string;
  address: string;
  accountType: Account;
  documentType: DocumentTypes;
  orgName?: string;
  documentPath: string;
  status: Status;
}

interface AgentDocument extends IAgent, mongoose.Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  // Instance methods
  hashPassword(): Promise<AgentDocument>;
  comparePassword(candidatePassword: string): Promise<boolean>;
  toJSON(): Record<string, any>;
}

interface AgentModel extends mongoose.Model<AgentDocument> {
  // Static methods
  isExists(username: string, email: string): Promise<boolean>;
  findByEmail(email: string): Promise<AgentDocument | null>;
  findByUsername(username: string): Promise<AgentDocument | null>;

  // You can also add methods that return Query
  findActive(): mongoose.Query<AgentDocument[], AgentDocument>;
}

const agentSchema = new mongoose.Schema<AgentDocument, AgentModel>(
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
    role: {
      type: String,
      enum: ["agent"],
      default: "agent",
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
    status: {
      type: String,
      required: true,
      enum: STATUS,
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

// Instance methods
agentSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
  return this;
};

agentSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Static methods
agentSchema.statics.isExists = async function (username, email) {
  const agent = await this.findOne({ $or: [{ username }, { email }] });
  return Boolean(agent);
};

agentSchema.statics.findByEmail = async function (email) {
  return this.findOne({ email });
};

agentSchema.statics.findByUsername = async function (username) {
  return this.findOne({ username });
};

// Export model
export const AgentModel = mongoose.model<AgentDocument, AgentModel>(
  "Agent",
  agentSchema,
);
