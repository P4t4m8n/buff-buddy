import type { ReactNode } from "react";
import { Route } from "react-router";
import HomePage from "./pages/HomePage";
import ProgramPage from "./pages/Program/ProgramPage";
import ExercisePage from "./pages/exercise/ExercisePage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import ProgramDetails from "./pages/Program/ProgramDetails";
import WorkoutPage from "./pages/Workout/WorkoutPage";
import WorkoutDetailsPage from "./pages/Workout/WorkoutDetailsPage";
import WorkoutStartPage from "./pages/Workout/WorkoutStartPage";
import WorkoutEditPage from "./pages/Workout/WorkoutEditPage";
import WorkoutListPage from "./pages/Workout/WorkoutListPage";
import DietPage from "./pages/Diet/DietPage";
import ProgramEditPage from "./pages/Program/ProgramEditPage";
import MealPage from "./pages/Meal/MealPage";
import MealEditPage from "./pages/Meal/MealEditPage";
import FoodItemEditPage from "./pages/FoodItem/FoodItemEditPage";
import ExerciseEditPage from "./pages/exercise/ExerciseEditPage";
import ExerciseDetailsPage from "./pages/exercise/ExerciseDetailsPage";

export interface RouteConfig {
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

export const ROUTES: RouteConfig[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/workouts",
    element: <WorkoutPage />,

  },
  {
    path: "/workouts/workout-list",
    element: <WorkoutListPage />,
  },
  {
    path: "/workouts/edit",
    element: <WorkoutEditPage />,
  },
  {
    path: "/workouts/:workoutId",
    element: <WorkoutDetailsPage />,
  },
  {
    path: "/workouts/workout-start/:programId/:workoutId",
    element: <WorkoutStartPage />,
  },

  {
    path: "/workouts/edit/:workoutId",
    element: <WorkoutEditPage />,
  },
  {
    path: "/programs",
    element: <ProgramPage />,
    children: [],
  },
  {
    path: "/programs/edit",
    element: <ProgramEditPage />,
  },
  {
    path: "/programs/edit/:programId",
    element: <ProgramEditPage />,
  },
  {
    path: "/programs/:programId",
    element: <ProgramDetails />,
  },

  {
    path: "/exercises",
    element: <ExercisePage />,
    children: [
      {
        path: "/exercises/:exerciseId",
        element: <ExerciseDetailsPage />,
      },
      {
        path: "/exercises/edit/:exerciseId",
        element: <ExerciseEditPage />,
      },
      {
        path: "/exercises/edit",
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
  {
    path: "/diet",
    element: <DietPage />,
  },
  {
    path: "/meals",
    element: <MealPage />,
  },
  {
    path: "/meals/edit",
    element: <MealEditPage />,
  },
  {
    path: "/meals/edit/:mealId",
    element: <MealEditPage />,
  },
  {
    path: "/meals/:mealIdParams",
    element: <MealEditPage />,
  },
  {
    path: "/foodItem/edit",
    element: <FoodItemEditPage />,
  },
  {
    path: "/foodItem/edit/:foodItemId",
    element: <FoodItemEditPage />,
  },
];
