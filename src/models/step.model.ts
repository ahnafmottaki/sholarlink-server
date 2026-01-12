import mongoose from "mongoose";
interface IStep {
  showToAgent: string;
  completed: boolean;
  order: number;
}

interface Step extends IStep, mongoose.Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

interface Step_Model extends mongoose.Model<Step> {
  createStep: () => Promise<void>;
}
const stepSchema = new mongoose.Schema(
  {
    showToAgent: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

stepSchema.statics.createStep = async function () {
  const textStep = {
    showToAgent: "evisa sent to your email",
    completed: false,
    order: 5,
  };

  const result = await this.insertOne(textStep);
  console.log(result);
};
export const StepModel = mongoose.model<Step, Step_Model>("Step", stepSchema);
export type { IStep };
