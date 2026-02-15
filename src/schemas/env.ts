import { z } from "zod";

export const EnvSchema = z
  .object({
    HELPER_COINBASE_CREDENTIALS_PATH: z.string().min(1)
  }).loose();

export type Env = z.infer<typeof EnvSchema>;
