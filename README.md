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

Default env location for helper tooling:

```bash
~/.config/helper/.env
```

You can validate environment setup and credentials file parsing with:

```bash
npm run build
npm link
helper-env-check
```

Optional override:

```bash
helper-env-check --env-file /absolute/path/to/.env
```

### Coinbase CDP API Keys

This library expects Coinbase App API credentials created in the CDP portal.

- Use a CDP Secret API key with the `ECDSA`/`ES256` signature algorithm (not `Ed25519` for Coinbase App API auth).
- The credentials JSON pointed to by `HELPER_COINBASE_CREDENTIALS_PATH` must match:

```json
{
  "name": "organizations/{org_id}/apiKeys/{key_id}",
  "privateKey": "-----BEGIN EC PRIVATE KEY-----\n...\n-----END EC PRIVATE KEY-----\n"
}
```

- Preserve private key newlines exactly (either real multiline PEM or `\n` escaped newlines in a single string).

Reference: https://docs.cdp.coinbase.com/coinbase-app/authentication-authorization/api-key-authentication

## Basic Usage

```ts
import cb, { orders, rest, toIncrement } from "cb-lib";

const accounts = await rest.requestAccounts();
const product = await rest.requestProduct("BTC-USD");

const orderId = await orders.createMarketOrder("BTC-USD", "BUY", "0.001");
const usd = await cb.rest.requestCurrencyAccount("USD");
const rounded = toIncrement("0.01", 123.456); // "123.45"
```

## API Surface

`cb-lib` exposes the full module surface:

- Grouped namespaces: `rest`, `orders`, `increment`, `cache`, `signing`, `env`, `schemas`
- Direct named exports for all functions/types from `src/rest.ts`, `src/service/order.ts`, `src/lib/*`, and `src/schemas/*`
- Default export: `cb`/`coinbase` object with the grouped namespaces above

## What It Includes

- REST request helpers for Coinbase brokerage endpoints (`src/rest.ts`)
- Order creation helpers (`src/service/order.ts`)
- Increment/rounding helpers (`src/lib/increment.ts`)
- Cache and signing helpers (`src/lib/cache.ts`, `src/lib/signing.ts`)
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
npm run release:check
```

## CI

GitHub Actions runs on push to `main` and on pull requests, executing:

- `npm ci`
- `npm run release:check`
- `npm run build`

Tag pushes matching `v*` also trigger automated GitHub Releases.

## License

Apache-2.0
