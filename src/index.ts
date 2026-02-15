import Product from "./Product.js";
import { getCredentials } from "./credentials.js";
import { getTransactionSummary } from "./transaction_summary.js";
import {
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
} from "./rest.js";
import {
  createBracketOrder,
  createLimitOrder,
  createLimitTpSlOrder,
  createMarketOrder,
  createStopLimitOrder,
} from "./service/order.js";

export { Product, getCredentials, getTransactionSummary };

export const rest = {
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
} as const;

export const orders = {
  createBracketOrder,
  createLimitOrder,
  createLimitTpSlOrder,
  createMarketOrder,
  createStopLimitOrder,
} as const;

export const coinbase = {
  Product,
  getCredentials,
  getTransactionSummary,
  rest,
  orders,
} as const;

export default coinbase;

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
