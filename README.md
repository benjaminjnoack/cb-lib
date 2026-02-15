# cb-lib

[![CI](https://github.com/benjaminjnoack/cb-lib/actions/workflows/ci.yml/badge.svg)](https://github.com/benjaminjnoack/cb-lib/actions/workflows/ci.yml)

`cb-lib` is a TypeScript/Node.js library for interacting with Coinbase Advanced Trade APIs.

## Requirements

- Node.js `>=20`
- npm

## Installation

```bash
npm install cb-lib
```

Or directly from GitHub while the package is not published to npm:

```bash
npm install github:benjaminjnoack/cb-lib
```

## Configuration

Set the Coinbase credentials file path in your environment:

```bash
HELPER_COINBASE_CREDENTIALS_PATH=/absolute/path/to/coinbase-credentials.json
```

A template is available in `.env.example`.

## Basic Usage

```ts
import cb, { orders, rest } from "cb-lib";

const accounts = await rest.requestAccounts();
const product = await rest.requestProduct("BTC-USD");

const orderId = await orders.createMarketOrder("BTC-USD", "BUY", "0.001");
const usd = await cb.rest.requestCurrencyAccount("USD");
```

## What It Includes

- REST request helpers for Coinbase brokerage endpoints (`src/rest.ts`)
- Order creation helpers (`src/service/order.ts`)
- Product helpers (`src/Product.ts`)
- Transaction summary caching helper (`src/transaction_summary.ts`)
- Zod schemas for runtime validation (`src/schemas/`)

## Development

```bash
npm install
npm run lint
npm run typecheck
npm run test
npm run build
```

## CI

GitHub Actions runs on push to `main` and on pull requests, executing:

- `npm ci`
- `npm run release:check`
- `npm run build`

## License

Apache-2.0
