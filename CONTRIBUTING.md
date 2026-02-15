# cb

`cb` is a TypeScript-based Node.js CLI project.
This README is a developer manual for the codebase and tooling setup.

CLI command usage and end-user documentation will be added after the CLI code is moved into this repository.

## Requirements

- Node.js `>=20`
- npm (current stable)

## Environment Setup

- Copy `.env.example` to `.env` and set local values.
- Never commit `.env` or credential files.
- `HELPER_COINBASE_CREDENTIALS_PATH` should point to your local Coinbase credentials JSON.

## Tech Stack

- TypeScript
  - Primary language for application code.
  - Provides static typing and safer refactoring.
- `@types/node`
  - Type definitions for Node.js APIs (`process`, streams, `fs`, etc.).
  - Required because `tsconfig.json` includes `"types": ["node"]`.
- Node.js (ESM)
  - Runtime for the CLI.
  - Uses modern ECMAScript modules (`"type": "module"`).
- tsx
  - Runs TypeScript files directly in development.
  - Used for quick local iteration without a build step.
- commander
  - Command parsing framework used to define CLI commands and options.
- zod
  - Runtime schema validation for command arguments/options.
- eslint + typescript-eslint
  - Linting and code quality checks for TypeScript code.
  - Uses ESLint flat config in `eslint.config.mjs`.
- vitest
  - Test runner for unit/integration tests.
- `@vitest/coverage-v8`
  - Coverage reporting using Node/V8 coverage instrumentation.
  - Configured through `vitest.config.ts`.

## Project Conventions

- Source files live in `src/`.
- Test files live in `test/`.
- Build output goes to `dist/`.
- Coverage output goes to `coverage/`.
- Directory organization target:
  - `src/commands/` for command registration/wiring
  - `src/schemas/` for zod schemas and validators
  - `src/services/` for integrations/external API clients
  - `src/lib/` for shared internal utilities
- The package exposes a CLI binary named `cb` via:
  - `package.json` -> `bin.cb` -> `./dist/cli.js`
- TypeScript is configured for strict checking in `tsconfig.json`.

## Entrypoint Architecture

- `src/cli.ts`
  - Thin executable wrapper with a Node shebang.
  - Calls `main()` from `src/cb.ts`.
- `src/cb.ts`
  - Exposes `createProgram()` to build the commander instance.
  - Exposes `main()` to parse argv and run the CLI.
- `src/commands/register/`
  - Domain-level command registration modules (accounts, limit, market, orders, products).
  - Keeps command wiring separate from executable bootstrap.

## Scripts

All scripts are defined in `package.json`:

- `npm run dev`
  - Runs `src/cli.ts` directly with `tsx`.
  - Pass CLI arguments after `--` (example: `npm run dev -- price BTC`).
- `npm run build`
  - Compiles TypeScript to `dist/`.
- `npm run typecheck`
  - Runs type checking only (no emitted files).
- `npm run lint`
  - Lints the codebase with ESLint.
- `npm run lint:fix`
  - Auto-fixes lint issues where possible.
- `npm run test`
  - Runs tests once with Vitest.
- `npm run test:watch`
  - Runs Vitest in watch mode.
- `npm run clean`
  - Removes `dist/`.
- `npm run smoke:bin`
  - Executes the built CLI entrypoint (`dist/cli.js`) directly with Node.
- `npm run pack:dry`
  - Runs `npm pack --dry-run` to preview publish contents.
- `npm run release:check`
  - Runs lint, typecheck, tests, and package dry run in sequence.
- `npm run prepack`
  - Automatically runs before `npm pack`/`npm publish` and ensures a clean build.

## Build And Run Guide

Use `cli.ts` / `dist/cli.js` as the executable entrypoint.

- Development run (TypeScript, no build step):
  - `npm run dev -- <args>`
  - Example: `npm run dev -- price BTC`
- Production-style run (compiled output):
  - `npm run build`
  - `node dist/cli.js <args>`
  - Example: `node dist/cli.js price BTC`
- Installed package run (via `bin`):
  - `cb <args>`

Notes:

- `src/cb.ts` is application wiring (`createProgram()` + `main()`), not the preferred direct executable surface.
- If command behavior differs between dev/build, check that `dist/` is fresh (`npm run clean && npm run build`).

## Development Workflow

1. Install dependencies:
   - `npm install`
   - Note: `@types/node` must be present in `devDependencies` for TypeScript-based scripts to run, because the project explicitly targets Node typings in `tsconfig.json`.
2. Validate static checks early:
   - `npm run typecheck`
   - `npm run lint`
3. Run command(s) during development:
   - `npm run dev -- <args>`
4. Run tests:
   - `npm run test`
   - `npm run test:watch` (while iterating)
5. Before committing:
   - `npm run lint`
   - `npm run typecheck`
   - `npm run test`
6. Create a production build when needed:
   - `npm run build`
7. Before packaging/publishing:
   - `npm run release:check`

## Pre-Commit Hooks

This repository uses Husky + lint-staged for local pre-commit checks.

- Hook entrypoint:
  - `.husky/pre-commit`
- What runs on commit:
  - `lint-staged`
  - staged `*.{ts,tsx,js,mjs,cjs}` files are auto-fixed with `eslint --fix`
- One-time setup after clone:
  - `npm install` (runs `prepare`, which installs Husky hooks)

Notes:

- Hooks run only on staged files for speed.
- CI still runs full-repo checks and is the source of truth.

## CI Workflow

GitHub Actions workflow:

- file: `.github/workflows/ci.yml`
- triggers:
  - pull requests
  - pushes to `main`
- job steps:
  - `npm ci`
  - `npm run release:check` (lint + typecheck + test + pack dry-run)
  - `npm run build`

If CI fails, fix locally with:

- `npm run release:check`
- `npm run build`

## Testing Guide

The current test setup uses Vitest with a Node environment.

- Run all tests once:
  - `npm run test`
- Run in watch mode:
  - `npm run test:watch`
- Run a single test file:
  - `npx vitest run test/cb.test.ts`
- Coverage output:
  - HTML + text reports are emitted to `coverage/`

Test authoring conventions:

- Put tests under `test/` and name them `*.test.ts`.
- Prefer testing exported units (`createProgram`, service helpers, schema parsing) over full CLI process spawning unless needed.

## Packaging Verification

- `package.json` uses `"files": ["dist"]`, so only compiled output is included from project sources.
- `npm run pack:dry` is the fastest way to confirm what would be published.
- `prepack` guarantees the package tarball is built from fresh compiled artifacts.
- `npm run smoke:bin` verifies the built CLI entrypoint runs before packaging.

## Global Installation

Run this validation first:

- `npm run release:check`

Choose one installation mode:

- Development-global link (recommended while actively changing code):
  - `npm link`
  - Run commands with: `cb <args>`
  - After source changes, rebuild before running:
    - `npm run build`
- Global install from current repository state:
  - `npm install -g .`
  - Run commands with: `cb <args>`

Update and uninstall:

- Update linked/global install from local repo:
  - `npm run build`
  - `npm install -g .`
- Remove global install:
  - `npm uninstall -g cb`
- Remove dev link:
  - `npm unlink -g cb`

## TypeScript Configuration

- `tsconfig.json` is the full-project typecheck config (includes `src/`, `test/`, and tooling config files).
- `tsconfig.build.json` is the production build config (emits only `src/` to `dist/`).

TypeScript is configured for:

- Node ESM compatibility (`module`/`moduleResolution`: `NodeNext`)
- strict type checking
- declaration + source map output for build artifacts
- `src` as build root and `dist` as build output directory

## Linting and Testing

- Linting ensures consistent style and catches common correctness issues early.
- ESLint is configured with type-aware TypeScript rules for `*.ts` files, while JS config/tooling files are linted without type-aware mode.
- Testing validates behavior and protects against regressions.
- Vitest configuration lives in `vitest.config.ts`.
- Coverage reports are generated with the V8 provider (`text` + `html`) into `coverage/`.

## Pre-PR Checklist

Before opening a PR, run:

- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`
- `npm run pack:dry`
