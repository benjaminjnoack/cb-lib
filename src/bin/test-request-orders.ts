#!/usr/bin/env node

import { requestOrders } from "../rest.js";
import { ORDER_STATUS, OrderPlacementSource } from "../schemas/enums.js";

/**
 * Start of the year I opened my coinbase account
 */
export const COINBASE_EPOCH = "2024-01-01T00:00:00.000Z";

async function run(): Promise<void> {
  const orders = await requestOrders(
    ORDER_STATUS.FILLED,
    OrderPlacementSource.UNKNOWN,
    null,
    COINBASE_EPOCH,
    new Date().toISOString(),
  );
  console.dir(orders, { depth: null });
}

run().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
