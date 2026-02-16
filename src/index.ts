import Product from "./Product.js";
import * as rest from "./rest.js";
import * as orders from "./service/order.js";
import * as increment from "./lib/increment.js";
import * as cache from "./lib/cache.js";
import * as signing from "./lib/signing.js";
import * as env from "./lib/env.js";
import * as schemasCredentials from "./schemas/credentials.js";
import * as schemasEnv from "./schemas/env.js";
import * as schemasEnums from "./schemas/enums.js";
import * as schemasOrders from "./schemas/orders.js";
import * as schemasPrimatives from "./schemas/primatives.js";
import * as schemasRest from "./schemas/rest.js";
import { getCredentials } from "./credentials.js";
import { getTransactionSummary } from "./transaction_summary.js";
import delay from "./lib/delay.js";
import { printError } from "./lib/error.js";
import { logger } from "./log/logger.js";
import { printOrder } from "./log/orders.js"

export { Product, getCredentials, getTransactionSummary, delay, printError };

export { rest, orders, increment, cache, signing, env, logger };

export const schemas = {
  credentials: schemasCredentials,
  env: schemasEnv,
  enums: schemasEnums,
  orders: schemasOrders,
  primatives: schemasPrimatives,
  rest: schemasRest,
} as const;

export const coinbase = {
  Product,
  getCredentials,
  getTransactionSummary,
  delay,
  printError,
  printOrder,
  rest,
  orders,
  increment,
  cache,
  signing,
  env,
  schemas,
} as const;

export default coinbase;

export * from "./credentials.js";
export * from "./transaction_summary.js";
export * from "./rest.js";
export * from "./service/order.js";
export * from "./lib/increment.js";
export * from "./lib/cache.js";
export * from "./lib/signing.js";
export * from "./lib/env.js";
export * from "./lib/error.js";
export * from "./schemas/credentials.js";
export * from "./schemas/env.js";
export * from "./schemas/enums.js";
export * from "./schemas/orders.js";
export * from "./schemas/primatives.js";
export * from "./schemas/rest.js";
export * from "./log/logger.js"
