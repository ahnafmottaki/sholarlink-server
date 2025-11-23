import { Collection, ObjectId } from "mongodb";
import { db } from "../config/db.config";
import { AppError } from "../lib/AppError";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

interface Admin {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  role: "admin";
  created_at: Date;
  updated_at: Date;
}

class AdminService {
  private _collection: Collection<Admin>;
  private readonly collectionName = "admins";
  constructor() {
    try {
    } catch (err) {}
    this._collection = db.collection<Admin>(this.collectionName);
  }

  get collection() {
    if (!this._collection) throw new Error("Collection not initialized");
    return this._collection;
  }

  async insertOne(admin: Admin) {
    const result = await this.collection.insertOne(admin);
    if (!result.insertedId)
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR,
      );
    console.log(result.insertedId);
    return result.insertedId;
  }

  static async createAdmin() {
    const hashedPassword = await bcrypt.hash("ah201408naf", 10);
    const admin: Admin = {
      _id: new ObjectId(),
      username: "ahnafmottaki",
      email: "ahnafmottaki2022@gmail.com",
      password: hashedPassword,
      role: "admin",
      created_at: new Date(),
      updated_at: new Date(),
    };
    return admin;
  }

  async createMyFirstAdmin() {
    const admin = await AdminService.createAdmin();
    try {
      await this.insertOne(admin);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new AdminService();
