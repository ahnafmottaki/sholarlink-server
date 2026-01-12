import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../lib/ApiResponse";
import { StudentInput } from "../types/student.types";
import storageService from "./storage.service";
import mongoose from "mongoose";
import { typedEntries } from "../lib/typedEntries";
import StudentModel from "../models/student.model";
import { AgentModel } from "../models/agent.model";
import { AppError } from "../lib/AppError";
import { StepModel } from "../models/step.model";

interface Documents {
  passport: Express.Multer.File;
  transcripts: Express.Multer.File;
  photo: Express.Multer.File;
}

class AgentService {
  getAgentDashboard(agentId: string) {
    console.log("from getAgentDashboard", agentId);
    return null;
  }

  async createStudentProfile(
    agentId: string,
    studentInput: StudentInput,
    documents: Documents
  ) {
    const profileId = new mongoose.Types.ObjectId();
    let documentsMapped = {} as Record<keyof Documents, string>;
    for (let [key, file] of typedEntries(documents)) {
      const fileName = storageService.getStudentProfileDocumentName(
        profileId.toString(),
        key,
        file.mimetype
      );
      await storageService.uploadFile(file, fileName);
      documentsMapped[key] = fileName;
    }

    const step = await StepModel.findOne({
      order: 1,
    });

    if (!step)
      throw new AppError(StatusCodes.BAD_REQUEST, "Step must be created first");

    const student = new StudentModel({
      _id: profileId,
      ...studentInput,
      ...documentsMapped,
      ownedBy: agentId,
      steps: [
        {
          _id: step._id,
          order: step.order,
          showToAgent: step.showToAgent,
          completed: step.completed,
        },
      ],
    });
    await student.save();
  }

  async getStudents(agentId: string) {
    const students = await StudentModel.find(
      { ownedBy: agentId },
      "_id firstName lastName university major satScore gpa contactNo createdAt updatedAt"
    );
    return students.map((student) => student.toJSON());
  }

  async getStudent(agentId: string, studentId: string) {
    const student = await StudentModel.findOne(
      {
        _id: studentId,
        ownedBy: agentId,
      },
      "-ownedBy"
    );

    if (!student) {
      throw new AppError(StatusCodes.NOT_FOUND, "Student not found");
    }

    [student.passport, student.transcripts, student.photo] =
      await storageService.getMultipleSignedUrls(
        student.passport,
        student.transcripts,
        student.photo
      );

    return student.toJSON();
  }
}

export default new AgentService();
