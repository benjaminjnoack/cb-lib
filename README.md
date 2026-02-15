# cb

[![CI](https://github.com/benjaminjnoack/cb/actions/workflows/ci.yml/badge.svg)](https://github.com/benjaminjnoack/cb/actions/workflows/ci.yml)

`cb` is a Node.js CLI for Coinbase account, product, and order workflows.

## Requirements

- Node.js `>=20`
- npm

## Installation

- From source (recommended while developing):
  - `npm install`
  - `npm run build`
  - `npm link`
- Or install globally from this repository:
  - `npm install -g .`

After either method, run with:

- `cb <command> [options]`

## Setup

1. Create `.env` from the example:
   - `cp .env.example .env`
2. Set:
   - `HELPER_COINBASE_CREDENTIALS_PATH=/absolute/path/to/coinbase-credentials.json`
3. Keep secrets local:
   - `.env` is ignored and should never be committed.

## Usage

Run in development without building:

- `npm run dev -- <command> [options]`

Run built CLI directly:

- `npm run build`
- `node dist/cli.js <command> [options]`

Get help:

- `cb --help`
- `cb <command> --help`

## Commands

### Accounts

- `cb accounts [product] [--crypto] [--cash]`
- `cb balance` (alias: `usd`)
- `cb cash`
- `cb fees`

### Products

- `cb product [product]`
- `cb price [product]`

### Market Orders

- `cb buy [product] [--baseSize <baseSize>] [--value <value>]`
- `cb sell [product] [--baseSize <baseSize>] [--value <value>]`
- `cb market <product> (--buy | --sell) [--baseSize <baseSize>] [--value <value>]`

### Limit Orders

- `cb bid [product] [--baseSize <baseSize>] [--value <value>]`
- `cb ask [product] [--baseSize <baseSize>] [--value <value>]`
- `cb limit [product] (--buy | --sell) [--baseSize <baseSize>] [--value <value>] --limitPrice <limitPrice>`
- `cb stop [product] --baseSize <baseSize> --limitPrice <limitPrice> --stopPrice <stopPrice>`
- `cb bracket [product] --baseSize <baseSize> --limitPrice <limitPrice> --stopPrice <stopPrice>`
- `cb max [product]`

### Plan

- `cb plan [product] --buyPrice <price> --stopPrice <stopPrice> --takeProfitPrice <takeProfitPrice> [--riskPercent <riskPercent>] [--bufferPercent <bufferPercent>] [--all-in] [--dryRunFlag]`

Notes:

- `--all-in` sizes to max affordable position and overrides risk-based sizing.
- `--riskPercent` and `--bufferPercent` have defaults.

### Orders

- `cb orders [product]` (alias: `open`)
- `cb order <order_id>`
- `cb cancel <order_id>`

## Development

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run release:check`

## Contributing

Project development workflow, tooling, and CI details are in `CONTRIBUTING.md`.
