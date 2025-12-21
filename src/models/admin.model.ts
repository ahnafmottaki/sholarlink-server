import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface Admin {
  username: string;
  email: string;
  password: string;
  role: "admin";
}

interface AdminDocument extends Admin, mongoose.Document {
  _id: ObjectId;
  created_at: Date;
  updated_at: Date;
}

interface AdminModel extends mongoose.Model<AdminDocument> {
  isExists(username: string, email: string): Promise<boolean>;
  findByEmail(email: string): Promise<AdminDocument | null>;
  findByUsername(username: string): Promise<AdminDocument | null>;
  createOne(): Promise<AdminDocument>;
}

const adminSchema = new mongoose.Schema<AdminDocument, AdminModel>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "admin" },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now },
});

adminSchema.statics.createOne = async function () {
  const admin = new AdminModel({
    username: "mash",
    email: "themashenterprises@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  });
  await admin.save();
  return admin;
};

adminSchema.statics.findByUsername = async function (username: string) {
  return this.findOne({ username });
};

adminSchema.statics.findByEmail = async function (email: string) {
  return this.findOne({ email });
};

const AdminModel = mongoose.model<AdminDocument, AdminModel>(
  "Admin",
  adminSchema,
);

export { AdminModel, Admin };
