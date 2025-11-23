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
  GOOGLE_APPLICATION_CREDENTIALS: z
    .string()
    .min(1, "GOOGLE_APPLICATION_CREDENTIALS is required"),
  MONGO_URI: z.string().min(1, "MONGO_URI is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  JWT_EXPIRES_IN: z.string().default("1d"),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("Invalid environment variables:\n", parsed.error.issues);
  process.exit(1);
}

// Export strongly-typed env
export const env = parsed.data;
