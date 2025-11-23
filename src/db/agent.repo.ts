import { Collection, ObjectId } from "mongodb";
import { getDb } from "../config/db.config";
import { Agent } from "../models/agent.model";

const COLLECTION = "agents";

function collection(): Collection<Agent> {
  return getDb().collection(COLLECTION) as Collection<Agent>;
}

export async function isExists(username: string, email: string) {
  const agent = await collection().findOne({ $or: [{ username }, { email }] });
  return !!agent;
}

export async function createAgent(agent: Agent) {
  const result = await collection().insertOne(agent);
  return result.insertedId as ObjectId;
}

export async function findAgentByUsername(username: string) {
  return collection().findOne({ username });
}

export async function findAgentById(id: string | ObjectId) {
  const _id = typeof id === "string" ? new ObjectId(id) : id;
  return collection().findOne({ _id });
}

export async function updateAgent(
  id: string | ObjectId,
  patch: Partial<Agent>,
) {
  const _id = typeof id === "string" ? new ObjectId(id) : id;
  await collection().updateOne({ _id }, { $set: patch });
  return findAgentById(_id);
}
