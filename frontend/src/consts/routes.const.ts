const HOME_ROUTE = "/";

const EXERCISE_PAGE_ROUTE = "/exercises";
const EXERCISE_EDIT_ROUTE = "/exercises/edit";
const EXERCISE_EDIT_WITH_ID_ROUTE = "/exercises/edit/:exerciseId";
const EXERCISE_DETAILS_ROUTE = "/exercises/:exerciseId";

export const EXERCISE_ROUTES = {
  EXERCISE_PAGE_ROUTE,
  EXERCISE_EDIT_ROUTE,
  EXERCISE_EDIT_WITH_ID_ROUTE,
  EXERCISE_DETAILS_ROUTE,
};

const PROGRAM_PAGE_ROUTE = "/programs";
const PROGRAM_EDIT_ROUTE = "/programs/edit";
const PROGRAM_EDIT_WITH_ID_ROUTE = "/programs/edit/:programId";
const PROGRAM_DETAILS_ROUTE = "/programs/:programId";

export const PROGRAM_ROUTES = {
  PROGRAM_PAGE_ROUTE,
  PROGRAM_EDIT_ROUTE,
  PROGRAM_EDIT_WITH_ID_ROUTE,
  PROGRAM_DETAILS_ROUTE,
};

const DIET_PAGE_ROUTE = "/diet";
const DIET_EDIT_ROUTE = "/diet/edit";
const DIET_EDIT_WITH_ID_ROUTE = "/diet/edit/:programId";
const DIET_DETAILS_ROUTE = "/diet/:programId";

export const DIET_ROUTES = {
  DIET_PAGE_ROUTE,
  DIET_EDIT_ROUTE,
  DIET_EDIT_WITH_ID_ROUTE,
  DIET_DETAILS_ROUTE,
};

const MEALS_PAGE_ROUTE = "/meals";
const MEAL_EDIT_ROUTE = MEALS_PAGE_ROUTE + "/edit";
const MEAL_EDIT_WITH_ID_ROUTE = MEAL_EDIT_ROUTE + "/:mealId";
const MEAL_DETAILS_ROUTE = MEALS_PAGE_ROUTE + "/:id";

export const MEAL_ROUTES = {
  MEALS_PAGE_ROUTE,
  MEAL_EDIT_ROUTE,
  MEAL_EDIT_WITH_ID_ROUTE,
  MEAL_DETAILS_ROUTE,
};

const FOOD_ITEM_PAGE_ROUTE = "/food-items";
const FOOD_ITEM_EDIT_ROUTE = "/food-items/edit";
const FOOD_ITEM_EDIT_WITH_ID_ROUTE = "/food-items/edit/:foodItemId";
const FOOD_ITEM_DETAILS_ROUTE = "/food-items/:foodItemId";

export const FOOD_ITEM_ROUTES = {
  FOOD_ITEM_PAGE_ROUTE,
  FOOD_ITEM_EDIT_ROUTE,
  FOOD_ITEM_EDIT_WITH_ID_ROUTE,
  FOOD_ITEM_DETAILS_ROUTE,
};

const AUTH_PAGE_ROUTE = "/auth";

export const AUTH_ROUTES = {
  AUTH_PAGE_ROUTE,
};

const WORKOUT_PAGE_ROUTE = "/workouts";
const WORKOUT_EDIT_ROUTE = "/workouts/edit";
const WORKOUT_EDIT_WITH_ID_ROUTE = "/workouts/edit/:workoutId";
const WORKOUT_DETAILS_ROUTE = "/workouts/:workoutId";
const WORKOUT_LIST_ROUTE = "/workouts/workout-list";

const WORKOUT_START_ROUTE = "/workouts/workout-start/:programId/:workoutId";

export const WORKOUT_ROUTES = {
  WORKOUT_PAGE_ROUTE,
  WORKOUT_EDIT_ROUTE,
  WORKOUT_EDIT_WITH_ID_ROUTE,
  WORKOUT_DETAILS_ROUTE,
  WORKOUT_START_ROUTE,
  WORKOUT_LIST_ROUTE,
};

export const ROUTES_STORE = {
  HOME_ROUTE,
  ...PROGRAM_ROUTES,
  ...AUTH_ROUTES,
  ...MEAL_ROUTES,
  ...DIET_ROUTES,
  ...FOOD_ITEM_ROUTES,
  ...EXERCISE_ROUTES,
  ...WORKOUT_ROUTES,
};
