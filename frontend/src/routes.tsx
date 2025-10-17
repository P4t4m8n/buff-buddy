//Lib
import { Route } from "react-router";
//Pages
import HomePage from "./pages/HomePage";
import ProgramPage from "./pages/Program/ProgramPage";
import ExercisePage from "./pages/Exercise/ExercisePage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import ProgramDetails from "./pages/Program/ProgramDetails";
import WorkoutPage from "./pages/Workout/WorkoutPage";
import WorkoutDetailsPage from "./pages/Workout/WorkoutDetailsPage";
import WorkoutStartPage from "./pages/WorkoutStart/WorkoutStartPage";
import WorkoutEditPage from "./pages/Workout/WorkoutEditPage";
import WorkoutListPage from "./pages/Workout/WorkoutListPage";
import DietPage from "./pages/Diet/DietPage";
import ProgramEditPage from "./pages/Program/ProgramEditPage";
import MealPage from "./pages/Meal/MealPage";
import MealEditPage from "./pages/Meal/MealEditPage";
import FoodItemEditPage from "./pages/FoodItem/FoodItemEditPage";
import ExerciseEditPage from "./pages/Exercise/ExerciseEditPage";
import ExerciseDetailsPage from "./pages/Exercise/ExerciseDetailsPage";
//Consts
import { ROUTES_STORE } from "./consts/routes.const";
//Types
import type { ReactNode } from "react";
import AuthPage from "./pages/AuthPage";
import FoodItemPage from "./pages/FoodItem/FoodItemPage";
import MealDetailsPage from "./pages/Meal/MealDetailsPage";

interface RouteConfig {
  path: string;
  element: ReactNode;
  children?: RouteConfig[];
}

export const renderRoutes = (routes: RouteConfig[]) => {
  return routes.map((route) => (
    <Route key={route.path} path={route.path} element={route.element}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
};

const FOOD_ITEMS_ROUTES: RouteConfig[] = [
  {
    path: ROUTES_STORE.FOOD_ITEM_PAGE_ROUTE,
    element: <FoodItemPage />,
    children: [
      {
        path: ROUTES_STORE.FOOD_ITEM_EDIT_ROUTE,
        element: <FoodItemEditPage />,
      },
      {
        path: ROUTES_STORE.FOOD_ITEM_EDIT_WITH_ID_ROUTE,
        element: <FoodItemEditPage />,
      },
    ],
  },
];

const DIET_ROUTES: RouteConfig[] = [
  {
    path: ROUTES_STORE.DIET_PAGE_ROUTE,
    element: <DietPage />,
    children: [
      {
        path: ROUTES_STORE.DIET_PAGE_ROUTE + ROUTES_STORE.MEALS_PAGE_ROUTE,
        element: <MealPage />,
      },
    ],
  },
];

const MEAL_ROUTES: RouteConfig[] = [
  {
    path: ROUTES_STORE.MEALS_PAGE_ROUTE,
    element: <MealPage />,
    children: [],
  },
  {
    path: ROUTES_STORE.MEAL_EDIT_WITH_ID_ROUTE,
    element: <MealEditPage />,
  },
  {
    path: ROUTES_STORE.MEAL_EDIT_ROUTE,
    element: <MealEditPage />,
  },
  {
    path: ROUTES_STORE.MEAL_DETAILS_ROUTE,
    element: <MealDetailsPage />,
  },
];

export const ROUTES: RouteConfig[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: ROUTES_STORE.AUTH_PAGE_ROUTE,
    element: <AuthPage />,
  },
  {
    path: ROUTES_STORE.WORKOUT_PAGE_ROUTE,
    element: <WorkoutPage />,
  },
  {
    path: ROUTES_STORE.WORKOUT_LIST_ROUTE,
    element: <WorkoutListPage />,
  },
  {
    path: ROUTES_STORE.WORKOUT_EDIT_ROUTE,
    element: <WorkoutEditPage />,
  },
  {
    path: ROUTES_STORE.WORKOUT_EDIT_WITH_ID_ROUTE,
    element: <WorkoutEditPage />,
  },
  {
    path: ROUTES_STORE.WORKOUT_DETAILS_ROUTE,
    element: <WorkoutDetailsPage />,
  },
  {
    path: ROUTES_STORE.WORKOUT_START_ROUTE,
    element: <WorkoutStartPage />,
  },
  {
    path: ROUTES_STORE.PROGRAM_PAGE_ROUTE,
    element: <ProgramPage />,
  },
  {
    path: ROUTES_STORE.PROGRAM_EDIT_ROUTE,
    element: <ProgramEditPage />,
  },
  {
    path: ROUTES_STORE.PROGRAM_EDIT_WITH_ID_ROUTE,
    element: <ProgramEditPage />,
  },
  {
    path: ROUTES_STORE.PROGRAM_DETAILS_ROUTE,
    element: <ProgramDetails />,
  },

  {
    path: ROUTES_STORE.EXERCISE_PAGE_ROUTE,
    element: <ExercisePage />,
    children: [
      {
        path: ROUTES_STORE.EXERCISE_DETAILS_ROUTE,
        element: <ExerciseDetailsPage />,
      },
      {
        path: ROUTES_STORE.EXERCISE_EDIT_WITH_ID_ROUTE,
        element: <ExerciseEditPage />,
      },
      {
        path: ROUTES_STORE.EXERCISE_EDIT_ROUTE,
        element: <ExerciseEditPage />,
      },
    ],
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  ...DIET_ROUTES,
  ...MEAL_ROUTES,
  ...FOOD_ITEMS_ROUTES,
];
