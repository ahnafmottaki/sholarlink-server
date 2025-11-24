import { Collection, ObjectId } from "mongodb";
import { getDb } from "../config/db.config";
import { Admin } from "../models/admin.model";

const COLLECTION = "admins";

function collection() {
  return getDb().collection("admins") as Collection<Admin>;
}

export const findByUsername = async (username: string) => {
  const admin = await collection().findOne({ username });
  return admin;
};

export const findById = async (id: string) => {
  const admin = await collection().findOne({ _id: new ObjectId(id) });
  return admin;
};
