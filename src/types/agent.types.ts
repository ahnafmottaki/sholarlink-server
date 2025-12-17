import mongoose from "mongoose";
import { Account, DocumentTypes } from "../constants/document-types";

interface IAgent {
  username: string;
  password: string;
  country: mongoose.Schema.Types.ObjectId;
  contactNo: string;
  name: string;
  email: string;
  address: string;
  accountType: Account;
  documentType: DocumentTypes;
  orgName?: string;
  documentPath: string;
}

export type { IAgent };
