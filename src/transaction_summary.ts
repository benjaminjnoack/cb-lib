import { requestTransactionSummary } from "./rest.js";
import { loadCoinbase, saveCoinbase } from "./lib/cache.js";
import { type TransactionSummary, TransactionSummaryResponseSchema } from "./schemas/rest.js";

let TRANSACTION_SUMMARY: TransactionSummary | null = null;

export async function getTransactionSummary(): Promise<TransactionSummary> {
  if (TRANSACTION_SUMMARY) {
    console.debug("getTransactionSummary => cached in memory");
  } else {
    const cached = loadCoinbase("transaction_summary");

    if (cached) {
      try {
        TRANSACTION_SUMMARY = TransactionSummaryResponseSchema.parse(cached);
        console.debug("getTransactionSummary => cached on disk");
      } catch (err) {
        console.warn("getTransactionSummary => cached data invalid, refreshing");
        console.debug(err);
      }
    } else {
      console.info("getTransactionSummary => not found on disk");
    }

    if (!TRANSACTION_SUMMARY) {
      TRANSACTION_SUMMARY = await requestTransactionSummary();
      await saveCoinbase("transaction_summary", TRANSACTION_SUMMARY);
    }
  }

  return TRANSACTION_SUMMARY;
}
