import path from "node:path";
import envPaths from "env-paths";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import {
  type CoinbaseProduct,
  CoinbaseProductSchema,
} from "../schemas/rest.js";
import { logger } from "../log/logger.js";
import { type CoinbaseOrder, CoinbaseOrderSchema } from "../schemas/orders.js";

const paths = envPaths("helper");
export const cacheDir = paths.cache;
mkdirSync(cacheDir, { recursive: true });
const coinbaseDir = path.join(cacheDir, "coinbase");
mkdirSync(coinbaseDir, { recursive: true });
const productsDir = path.join(coinbaseDir, "products");
mkdirSync(productsDir, { recursive: true });
const ordersDir = path.join(coinbaseDir, "orders");
mkdirSync(ordersDir, { recursive: true });

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

export function loadCoinbaseFromCache(name: string) {
  const cachePath = path.join(coinbaseDir, `${name}.json`);
  return loadJsonFromCache(cachePath);
}

export function saveCoinbaseToCache(
  name: string,
  data: object,
) {
  const cachePath = path.join(coinbaseDir, `${name}.json`);
  saveJsonToCache(cachePath, data);
}

export function loadProductFromCache(productId: string): CoinbaseProduct {
  const cachePath = path.join(productsDir, `${productId}.json`);
  const cache = loadJsonFromCache(cachePath);
  if (!cache) {
    throw new Error(`Cannot find product ${productId}`);
  }
  return CoinbaseProductSchema.parse(cache);
}

export function saveProductToCache(productId: string, data: object): void {
  const cachePath = path.join(productsDir, `${productId}.json`);
  return saveJsonToCache(cachePath, data);
}

export function loadOrderFromCache(orderId: string): CoinbaseOrder {
  const cachePath = path.join(ordersDir, `${orderId}.json`);
  const cache = loadJsonFromCache(cachePath);
  if (!cache) {
    throw new Error(`Cannot find order ${orderId}`);
  }
  return CoinbaseOrderSchema.parse(cache);
}

export function saveOrderToCache(orderId: string, data: object): void {
  const cachePath = path.join(ordersDir, `${orderId}.json`);
  return saveJsonToCache(cachePath, data);
}

