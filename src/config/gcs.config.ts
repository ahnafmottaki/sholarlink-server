import { Storage } from "@google-cloud/storage";
import { env } from "./env";

interface ServiceAccountCredentials {
  type: "service_account";
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri?: string;
  token_uri?: string;
  auth_provider_x509_cert_url?: string;
  client_x509_cert_url?: string;
}

function generateServiceAccountCredentials(): ServiceAccountCredentials {
  console.log(env.GOOGLE_PRIVATE_KEY);
  const credentials: ServiceAccountCredentials = {
    type: "service_account",
    project_id: env.GOOGLE_PROJECT_ID,
    private_key_id: env.GOOGLE_PRIVATE_KEY_ID || "",
    private_key: env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: env.GOOGLE_CLIENT_EMAIL,
    client_id: env.GOOGLE_CLIENT_ID || "",
  };

  credentials.auth_uri = env.AUTH_URL;
  credentials.token_uri = env.TOKEN_URL;
  credentials.auth_provider_x509_cert_url = env.AUTH_PROVIDER_CERT_URL;
  credentials.client_x509_cert_url = env.CLIENT_CERT_URL;
  return credentials;
}
const storage = new Storage({
  projectId: env.GOOGLE_PROJECT_ID,
  keyFilename: env.GOOGLE_SERVICE_KEY,
});
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME!);
export default bucket;
