# Buff Buddy Documentation

This `docs/` folder is the project documentation source of truth. It is organized by architecture and feature area, not by a single root README.

## What is here

- `docs/architecture.md` — overall project architecture, workspace layout, and runtime flow
- `docs/backend.md` — backend implementation and API routing structure
- `docs/frontend.md` — frontend app structure, routing, and page organization
- `docs/shared.md` — shared models, constants, and validation used by both packages

## How to use these docs

1. Start at `docs/index.md` for an overview.
2. Open `docs/architecture.md` to understand the high-level app structure.
3. Use `docs/frontend.md` when working on UI, page flows, or React code.
4. Use `docs/backend.md` when working on API routes, middleware, or server logic.
5. Use `docs/shared.md` when updating types, validation, or app constants.

## Quick commands

- `npm run front` — start the frontend development server
- `npm run back` — start the backend development server
- `npm run build` — build frontend and backend
- `npm run test --workspace=backend` — run backend tests
- `npm run e2e` — run frontend Playwright tests

## Notes

- This project uses a monorepo workspace with `backend/` and `frontend/` packages.
- The backend serves API routes under `/api/v1/`.
- The frontend is a React SPA built with Vite.
