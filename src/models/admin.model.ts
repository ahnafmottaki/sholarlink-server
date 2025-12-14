import { ObjectId } from "mongodb";

interface Admin {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  role: "admin";
  created_at: Date;
  updated_at: Date;
}

class AdminModel {
  private admin: Admin;
  constructor(admin: Admin) {
    this.admin = admin;
  }
  toDocument() {
    return {
      ...this.admin,
    };
  }
}

export { AdminModel, Admin };
