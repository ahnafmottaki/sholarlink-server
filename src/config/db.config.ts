import { Db, MongoClient, ServerApiVersion } from "mongodb";
import { env } from "./env";
const uri = env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db: Db | null = null;

export async function connectDb() {
  if (!db) {
    await client.connect();
    db = client.db("scholarlink");
  }
  return db;
}

export function getDb() {
  if (!db) throw new Error("Database not connected. Call connectDb() first.");
  return db as Db;
}
