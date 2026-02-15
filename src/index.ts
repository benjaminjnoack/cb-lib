export { default as Product } from "./Product.js";

export { getCredentials } from "./credentials.js";
export { getTransactionSummary } from "./transaction_summary.js";

export {
  http,
  requestAccounts,
  requestBestBidAsk,
  requestCurrencyAccount,
  requestMarketTrades,
  requestOpenOrders,
  requestOrder,
  requestOrderCancellation,
  requestOrderCreation,
  requestOrders,
  requestProduct,
  requestTransactionSummary,
  requestWithSchema,
} from "./rest.js";

export {
  createBracketOrder,
  createLimitOrder,
  createLimitTpSlOrder,
  createMarketOrder,
  createStopLimitOrder,
} from "./service/order.js";

export type { Credentials } from "./schemas/credentials.js";
export type { Env } from "./schemas/env.js";
export type { OrderSide } from "./schemas/enums.js";
export type {
  CoinbaseAccount,
  CoinbasePriceBook,
  CoinbaseProduct,
  OrderHistoricalBatchResponse,
  OrderRequest,
  TickerResponse,
  TransactionSummary,
} from "./schemas/rest.js";
