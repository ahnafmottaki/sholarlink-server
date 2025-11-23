import {
  CreateCollectionOptions,
  MongoClient,
  ServerApiVersion,
} from "mongodb";
import { agentCollectionOptions } from "../db_validators/agent.validator";
import { Agent } from "../zod/create-agent";
const uri = process.env.MONGODB_URI!;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

function createCollection(
  collectionName: string,
  options: CreateCollectionOptions = {},
) {
  return db.createCollection(collectionName, options);
}

const db = client.db("scholarlink");
export const agentCollection = db.collection<Agent>("agents");
export async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
    const collections = await db
      .listCollections()
      .map((col) => col.name)
      .toArray();
    if (!collections.includes("agents")) {
      console.log(collections);
      await db.createCollection("agents", agentCollectionOptions);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
