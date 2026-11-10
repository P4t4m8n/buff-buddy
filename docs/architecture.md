# Buff Buddy Architecture

## Workspace layout

The repo is organized as a workspace with two main packages:

- `backend/` — Express API server, database, Prisma, and authentication
- `frontend/` — React + Vite single-page application
- `shared/` — shared constants, models, utils, and validation logic

## Root package

The root `package.json` defines the workspace and top-level scripts:

- `npm run front` — start frontend dev server
- `npm run back` — start backend dev server
- `npm run build` — build frontend and backend packages

## Frontend runtime flow

1. `frontend/src/main.tsx` renders the React app into the DOM.
2. `frontend/src/App.tsx` wraps the app with React Query, routing, auth guard, and layout.
3. `frontend/src/routes.tsx` defines all page routes and nested routes.
4. Page components live in `frontend/src/pages/`.

## Backend runtime flow

1. `backend/src/server.ts` creates the Express app and starts the HTTP server.
2. `backend/src/setups/cors.setup.ts` configures CORS and static file serving.
3. `backend/src/setups/middlewares.setup.ts` applies JSON parsing, cookie parsing, and async local storage.
4. `backend/src/setups/routes.setup.ts` mounts API routers under `/api/v1/`.

## API routing

The backend routes mounted by `setupRoutes()` are:

- `POST /api/v1/auth/*`
- `GET/POST /api/v1/exercises/*`
- `GET/POST /api/v1/programs/*`
- `GET/POST /api/v1/workouts/*`
- `GET/POST /api/v1/user-workouts/*`
- `GET/POST /api/v1/food-items/*`
- `GET/POST /api/v1/meals/*`
- `GET/POST /api/v1/user-meal/*`
- `GET/POST /api/v1/workout-start/*`

## Production behavior

- In development, the backend uses CORS and runs separately from the frontend.
- In production, the backend serves the static frontend from `public/`.
- The client-side SPA fallback is handled by `app.all("/{*any}", ...)` in `backend/src/setups/routes.setup.ts`.
