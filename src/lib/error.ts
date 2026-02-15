import { z, ZodError } from "zod";

export function printError(e: unknown) {
  if (e instanceof ZodError) {
    console.error(z.formatError(e));
  } else if (e instanceof Error) {
    console.error(e.message);
  } else {
    console.error(e);
  }
}
