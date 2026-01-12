import mongoose from "mongoose";
import type { Step } from "../types/step.types";
import { StudentInput } from "../types/student.types";
type Student = StudentInput & {
  passport: string;
  transcripts: string;
  photo: string;
  steps: Step[];
};

type StudentDocuement = Student &
  mongoose.Document & {
    _id: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    ownedBy: mongoose.Types.ObjectId;
  };

type Student_Model = mongoose.Model<StudentDocuement> & {
  isExists: (id: string) => Promise<boolean>;
};

const studentSchema = new mongoose.Schema<StudentDocuement, Student_Model>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    gpa: { type: String, required: true },
    satScore: { type: String, required: true },
    major: { type: String, required: true },
    university: { type: String, required: true },
    passport: { type: String, required: true },
    transcripts: { type: String, required: true },
    photo: { type: String, required: true },
    steps: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          auto: true,
        },
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
        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    ownedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
  },
  { timestamps: true },
);

const StudentModel = mongoose.model<StudentDocuement, Student_Model>(
  "Student",
  studentSchema,
);

export default StudentModel;
