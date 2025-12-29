import { Storage } from "@google-cloud/storage";
import { env } from "./env";

const storage = new Storage({
  projectId: env.GOOGLE_PROJECT_ID,
  keyFilename: env.GOOGLE_SERVICE_KEY,
});
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME!);
export default bucket;
