import { z, ZodError } from "zod";
import { logger } from "../log/logger.js";

export function printError(e: unknown) {
  if (e instanceof ZodError) {
    logger.error(z.formatError(e));
  } else if (e instanceof Error) {
    logger.error(e.message);
  } else {
    logger.error(e);
  }
}
