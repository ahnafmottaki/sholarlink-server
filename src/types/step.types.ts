import mongoose from "mongoose";
import type { IStep } from "../models/step.model";
export type Step = IStep & {
  _id: mongoose.Types.ObjectId;
};
