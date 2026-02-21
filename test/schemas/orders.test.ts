import { describe, expect, it } from "vitest";
import { LimitOrderConfigurationSchema, OrderRequestSchema } from "../../src/index.js";

describe("LimitOrderConfigurationSchema", () => {
  it("defaults post_only to true when omitted", () => {
    const parsed = LimitOrderConfigurationSchema.parse({
      limit_limit_gtc: {
        base_size: "0.01",
        limit_price: "50000.00",
      },
    });

    expect(parsed.limit_limit_gtc.post_only).toBe(true);
  });

  it("accepts explicit post_only overrides", () => {
    const parsed = LimitOrderConfigurationSchema.parse({
      limit_limit_gtc: {
        base_size: "0.01",
        limit_price: "50000.00",
        post_only: false,
      },
    });

    expect(parsed.limit_limit_gtc.post_only).toBe(false);
  });
});

describe("OrderRequestSchema", () => {
  it("applies post_only default for limit orders", () => {
    const parsed = OrderRequestSchema.parse({
      client_order_id: "123e4567-e89b-12d3-a456-426614174000",
      product_id: "BTC-USD",
      side: "BUY",
      order_configuration: {
        limit_limit_gtc: {
          base_size: "0.01",
          limit_price: "50000.00",
        },
      },
    });

    const limitOrder = LimitOrderConfigurationSchema.parse(parsed.order_configuration);
    expect(limitOrder.limit_limit_gtc.post_only).toBe(true);
  });
});
