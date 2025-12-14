import { Collection, ObjectId } from "mongodb";
import { getDb } from "../config/db.config";
import { Admin } from "../models/admin.model";
import bcrypt from "bcryptjs";

const COLLECTION = "admins";

function collection() {
  return getDb().collection(COLLECTION) as Collection<Admin>;
}

export const findByUsername = async (username: string) => {
  const admin = await collection().findOne({ username });
  return admin;
};

export const findById = async (id: string) => {
  const admin = await collection().findOne({ _id: new ObjectId(id) });
  return admin;
};

export const createAdmin = async () => {
  const admin = {
    _id: new ObjectId(),
    username: "mash",
    email: "ahnafmottaki2022@gmail.com",
    password: await bcrypt.hash("123456", 10),
    role: "admin",
    created_at: new Date(),
    updated_at: new Date(),
  } as const;
  const result = await collection().insertOne(admin);
};
