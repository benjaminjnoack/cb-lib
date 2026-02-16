import { env } from "cb-lib";

type LogLevel = "debug" | "info" | "warn" | "error";

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

function getConfiguredLevel(): LogLevel {
  const configured = env.env().HELPER_LOG_LEVEL;
  if (configured === "debug" || configured === "info" || configured === "warn" || configured === "error") {
    return configured;
  }
  return "info";
}

function isEnabled(level: LogLevel): boolean {
  const configuredLevel = getConfiguredLevel();
  return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[configuredLevel];
}

export const logger = {
  debug: (...args: unknown[]): void => {
    if (isEnabled("debug")) {
      console.debug(...args);
    }
  },
  info: (...args: unknown[]): void => {
    if (isEnabled("info")) {
      console.info(...args);
    }
  },
  warn: (...args: unknown[]): void => {
    if (isEnabled("warn")) {
      console.warn(...args);
    }
  },
  error: (...args: unknown[]): void => {
    if (isEnabled("error")) {
      console.error(...args);
    }
  },
};
