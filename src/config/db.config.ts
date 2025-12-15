import mongoose from "mongoose";
import { env } from "./env";

async function mongoConnect() {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("database connected");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
}
export { mongoConnect };
