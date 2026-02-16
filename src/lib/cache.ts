import path from "node:path";
import envPaths from "env-paths";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import fs from "fs/promises";
import {
  type CoinbaseProduct,
  CoinbaseProductSchema,
} from "../schemas/rest.js";
import { logger } from "../log/logger.js";

const paths = envPaths("helper");
export const cacheDir = paths.cache;

// Ensure cache root and known subdirectories exist
mkdirSync(cacheDir, { recursive: true });
const PRODUCTS = "products";
const COINBASE = "coinbase";
const productsDir = path.join(cacheDir, PRODUCTS);
const coinbaseDir = path.join(cacheDir, COINBASE);
mkdirSync(productsDir, { recursive: true });
mkdirSync(coinbaseDir, { recursive: true });

export function loadJsonFromCache(cachePath: string): unknown {
  if (existsSync(cachePath)) {
    logger.debug(`Cache hit for ${cachePath}`);
    return JSON.parse(readFileSync(cachePath, "utf8"));
  }
  logger.debug(`Cache miss for ${cachePath}`);
  return null; // Cache miss
}

function saveJsonToCache(cachePath: string, data: object): void {
  mkdirSync(path.dirname(cachePath), { recursive: true });
  writeFileSync(cachePath, JSON.stringify(data, null, 2));
  logger.debug(`Cache saved for ${cachePath}`);
}

export function loadCoinbase(name: string) {
  const cachePath = path.join(cacheDir, COINBASE, `${name}.json`);
  return loadJsonFromCache(cachePath);
}

/**
 * @throws {Error} if productId is not found
 */
export function loadProduct(productId: string): CoinbaseProduct {
  const cachePath = path.join(cacheDir, PRODUCTS, `${productId}.json`);
  const cache = loadJsonFromCache(cachePath);
  if (!cache) {
    throw new Error(`Cannot find product ${productId}`);
  }
  return CoinbaseProductSchema.parse(cache);
}

/**
 * the special e is Node.js.ErrnoException return type tells the compiler:
 * “If this function returns true, then you can treat e as a Node.js.ErrnoException from here on.”
 */
function isNodeErrno(e: unknown): e is NodeJS.ErrnoException {
  return e instanceof Error && "code" in e;
}

export async function saveCoinbase(
  name: string,
  data: object,
  checkExpiration: boolean = true,
): Promise<boolean> {
  const cachePath = path.join(cacheDir, COINBASE, `${name}.json`);

  if (checkExpiration) {
    try {
      const stats = await fs.stat(cachePath);
      const now = Date.now();
      const mtime = stats.mtimeMs;
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (now - mtime <= twentyFourHours) {
        logger.debug(`saveCoinbase => ${name} cache is fresh; skipping write`);
        return false;
      }
      logger.warn(`saveCoinbase => ${name} cache is stale; refreshing`);
    } catch (err) {
      if (err instanceof Error) {
        if (isNodeErrno(err) && err.code !== "ENOENT") {
          throw err; // rethrow unexpected errors
        }
      }
      // If the file doesn't exist, proceed with write.
    }
  }

  saveJsonToCache(cachePath, data);
  return true;
}

export function saveProduct(productId: string, data: object): void {
  const cachePath = path.join(cacheDir, PRODUCTS, `${productId}.json`);
  return saveJsonToCache(cachePath, data);
}
