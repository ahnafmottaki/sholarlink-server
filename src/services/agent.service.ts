import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../lib/ApiResponse";
import { StudentInput } from "../types/student.types";
import storageService from "./storage.service";
import mongoose from "mongoose";
import { typedEntries } from "../lib/typedEntries";
import StudentModel from "../models/student.model";
import { AgentModel } from "../models/agent.model";

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
    documents: Documents,
  ) {
    const profileId = new mongoose.Types.ObjectId();
    let documentsMapped = {} as Record<keyof Documents, string>;
    for (let [key, file] of typedEntries(documents)) {
      const fileName = storageService.getStudentProfileDocumentName(
        profileId.toString(),
        key,
        file.mimetype,
      );
      await storageService.uploadFile(file, fileName);
      documentsMapped[key] = fileName;
    }

    const student = new StudentModel({
      _id: profileId,
      ...studentInput,
      ...documentsMapped,
      ownedBy: agentId,
    });
    await student.save();
  }

  async getStudents(agentId: string) {
    const students = await StudentModel.find(
      { ownedBy: agentId },
      "_id firstName lastName university major satScore gpa contactNo createdAt updatedAt",
    );
    const ownedBy = await AgentModel.findById(agentId);
    const studentsWithAgentName = students.map((student) => ({
      ...student.toObject(),
      ownedBy: ownedBy!.name,
    }));
    console.log(studentsWithAgentName);
    return studentsWithAgentName;
  }
}

export default new AgentService();
