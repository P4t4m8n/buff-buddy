# Backend Documentation

## Entry point

- `backend/src/server.ts`
  - Loads environment variables from `.env`
  - Creates Express app and HTTP server
  - Calls `setupCors()`, `setupMiddlewares()`, and `setupRoutes()`
  - Starts listener on `process.env.PORT || 3030`

## Setup files

- `backend/src/setups/cors.setup.ts`
  - Sets CORS origins for frontend development
  - Serves static files from `public/` in production
- `backend/src/setups/middlewares.setup.ts`
  - Applies `express.json()`
  - Applies `cookie-parser`
  - Applies `setupAsyncLocalStorage`
- `backend/src/setups/routes.setup.ts`
  - Registers API routers under `/api/v1/`
  - Falls back to `public/index.html` for unknown routes

## API modules

Backend API logic is organized under `backend/src/api/`:

- `auth/` — authentication, sessions, sign-in/up, Google callback
- `dashboard/` — dashboard-related backend endpoints
- `exercises/` — exercise CRUD and details
- `foodItems/` — food item CRUD
- `meals/` — meal CRUD
- `programs/` — program management
- `userMeal/` — user meal data
- `users/` — user data and user management
- `userSets/` — user strength/cardio set data
- `userWorkouts/` — user workout tracking
- `workoutExercise/` — workout-exercise relationships
- `workouts/` — workout CRUD
- `workoutStart/` — workout planning and workout start flows

## Important backend scripts

- `npm run dev` — start backend with `nodemon` and `ts-node`
- `npm run build` — generate Prisma client, compile TypeScript, copy frontend assets, and copy generated Prisma files
- `npm run start` — run the compiled backend from `dist/`
- `npm run migrate` — run Prisma migrations
- `npm run studio` — open Prisma Studio

## Notes for backend changes

- Add new API route folders under `backend/src/api/`
- Register the new router in `setupRoutes()`
- If database schema changes, update `prisma/schema.prisma` and run `npm run migrate --workspace=backend`
