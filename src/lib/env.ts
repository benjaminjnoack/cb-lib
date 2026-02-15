import dotenv from "dotenv";
import { type Env, EnvSchema } from "../schemas/env.js";

let didLoadDotenv = false;
let cachedEnv: Env | null = null;

function loadDotenv(explicitPath?: string) {
  if (didLoadDotenv) {return;}

  if (explicitPath) {
    dotenv.config({ path: explicitPath, quiet: true });
  } else {
    dotenv.config();
  }

  didLoadDotenv = true;
}

export function primeEnv(explicitPath?: string): void {
  if (cachedEnv) {return;}
  loadDotenv(explicitPath);
  cachedEnv = EnvSchema.parse(process.env);
}

export function env(): Env {
  if (!cachedEnv) {
    primeEnv();
  }
  if (!cachedEnv) {
    throw new Error("Failed to load environment configuration");
  }
  return cachedEnv;
}
