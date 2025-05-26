import dotenv from "dotenv";
import path from "path";
import { requireEnv, requireNumberEnv } from "../utils/validateEnv";

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
dotenv.config({ path: path.join(process.cwd(), envFile) });

export default {
  NODE_ENV: requireEnv("NODE_ENV"),
  PORT: requireEnv("PORT"),
  DB_URL: requireEnv("DATABASE_URL"),
  BCRYPT_SALT_ROUNDS: requireNumberEnv("BCRYPT_SALT_ROUNDS"),
  JWT_ACCESS_SECRET: requireEnv("JWT_ACCESS_SECRET"),
  JWT_ACCESS_EXPIRES_IN: requireEnv("JWT_ACCESS_EXPIRES_IN"),
  JWT_FORGOT_PASS_EXPIRES_IN: requireEnv("JWT_FORGOT_PASS_EXPIRES_IN"),
  RESET_PASS_URL: requireEnv("RESET_PASS_URL"),
  SMTP_HOST: requireEnv("SMTP_HOST"),
  SMTP_PORT: requireNumberEnv("SMTP_PORT"),
  SMTP_USER: requireEnv("SMTP_USER"),
  SMTP_PASS: requireEnv("SMTP_PASS"),
  STRIPE_SECRET_KEY: requireEnv("STRIPE_SECRET_KEY"),
  STRIPE_WEBHOOK_SECRET: requireEnv("STRIPE_WEBHOOK_SECRET"),
  PAYMENT_SUCCESS_URL: requireEnv("PAYMENT_SUCCESS_URL"),
  PAYMENT_CANCEL_URL: requireEnv("PAYMENT_CANCEL_URL"),
};
