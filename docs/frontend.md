# Frontend Documentation

## Entry points

- `frontend/src/main.tsx`
  - Imports global CSS
  - Renders `App` into `#root`
- `frontend/src/App.tsx`
  - Wraps app with `QueryClientWrapper`
  - Uses `BrowserRouter`
  - Applies `AuthGuard`
  - Renders route tree and footer
  - Displays global `Toast`

## Routing and pages

- `frontend/src/routes.tsx` defines the full route tree.
- Routes are built with `renderRoutes()` and nested using `children`.
- Route path constants come from `frontend/src/consts/routes.const.ts`.

### Main page areas

- `HomePage`
- `AuthPage`
- `Workout` pages
  - `WorkoutPage`
  - `WorkoutListPage`
  - `WorkoutEditPage`
  - `WorkoutDetailsPage`
  - `WorkoutStartPage`
- `Program` pages
  - `ProgramPage`
  - `ProgramEditPage`
  - `ProgramDetails`
- `Exercise` pages
  - `ExercisePage`
  - `ExerciseDetailsPage`
  - `ExerciseEditPage`
- `Diet / Meal` pages
  - `DietPage`
  - `MealPage`
  - `MealEditPage`
  - `MealDetailsPage`
  - `FoodItemPage`
  - `FoodItemEditPage`
- `Profile` pages
  - `ProfilePage`
  - `ProfileWorkoutPage`
- `AdminPage`

## Important frontend folders

- `frontend/src/components/` — shared UI components
- `frontend/src/services/` — API calls and request logic
- `frontend/src/lib/` — app helpers and wrappers, like React Query client
- `frontend/src/store/` — Zustand state management
- `frontend/src/hooks/` — custom hooks and context providers
- `frontend/src/models/` — frontend-specific models and types
- `frontend/src/utils/` — utility helpers

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — run `tsc -b` and `vite build`
- `npm run preview` — preview built app
- `npm run e2e` — run Playwright tests

## Notes for frontend changes

- Add page route configuration in `frontend/src/routes.tsx`
- Create or update page files under `frontend/src/pages/`
- Use `frontend/src/services/` for backend API calls
- Use shared models from `shared/` when the data shape is shared across backend and frontend
