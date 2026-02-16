import { z } from "zod";

export const EnvSchema = z
  .object({
    HELPER_COINBASE_CREDENTIALS_PATH: z.string().min(1),
    HELPER_POSTGRES_DATABASE: z.string().min(1).optional(),
    HELPER_POSTGRES_USERNAME: z.string().min(1).optional(),
    HELPER_POSTGRES_PASSWORD: z.string().min(1).optional(),
  }).loose();

export type Env = z.infer<typeof EnvSchema>;
