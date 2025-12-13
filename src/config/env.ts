// src/config/env.ts
import { config } from "dotenv";
import { z } from "zod";

config(); // load .env into process.env

// Define which ENV variables your app requires
const envSchema = z.object({
  PORT: z.string().default("5000"),
  ORIGIN: z.string().default("http://localhost:5173"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  GCS_BUCKET_NAME: z.string().min(1, "GCS_BUCKET is required"),
  MONGO_URI: z.string().min(1, "MONGO_URI is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  JWT_EXPIRES_IN: z.string().default("1d"),
  GOOGLE_SERVICE_KEY: z.string().min(1, "service key file path required"),
  GOOGLE_PROJECT_ID: z.string().min(1, "GOOGLE_PROJECT_ID required"),
  GOOGLE_CLIENT_EMAIL: z.string().min(1, "GOOGLE_CLIENT_EMAIL required"),
  GOOGLE_PRIVATE_KEY: z.string().min(1, "GOOGLE_PRIVATE_KEY required"),
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID required"),
  GOOGLE_PRIVATE_KEY_ID: z.string().min(1, "GOOGLE_PRIVATE_KEY_ID required"),
  AUTH_URL: z.string().min(1, "AUTH_URL required"),
  TOKEN_URL: z.string().min(1, "TOKEN_URL required"),
  AUTH_PROVIDER_CERT_URL: z.string().min(1, "AUTH_PROVIDER_CENT_URL required"),
  CLIENT_CERT_URL: z.string().min(1, "CLIENT_CERT_URL required"),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("Invalid environment variables:\n", parsed.error.issues);
  process.exit(1);
}

// Export strongly-typed env
export const env = parsed.data;
