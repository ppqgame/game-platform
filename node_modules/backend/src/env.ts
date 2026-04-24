import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().optional(),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(16),
  JWT_REFRESH_SECRET: z.string().min(16).default("dev-refresh-secret-16+"),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  ADMIN_SEED_EMAIL: z.string().email().default("admin@example.com"),
  ADMIN_SEED_PASSWORD: z.string().min(8).default("adminadmin"),
});

export const env = envSchema.parse(process.env);
