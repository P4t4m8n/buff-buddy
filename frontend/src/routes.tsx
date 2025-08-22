import type { ReactNode } from "react";
import { Route } from "react-router";
import HomePage from "./pages/HomePage";
import ProgramPage from "./pages/Program/ProgramPage";
import ExercisePage from "./pages/ExercisePage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import ProgramEdit from "./pages/Program/ProgramEdit";
import ProgramDetails from "./pages/Program/ProgramDetails";
import WorkoutPage from "./pages/Workout/WorkoutPage";
import WorkoutDetailsPage from "./pages/Workout/WorkoutDetailsPage";
import WorkoutStartPage from "./pages/Workout/WorkoutStartPage";
import WorkoutEditPage from "./pages/Workout/WorkoutEditPage";
import WorkoutListPage from "./pages/Workout/WorkoutListPage";

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
    children: [],
  },
  {
    path: "/workouts/list",
    element: <WorkoutListPage />,
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
    path: "/workouts/edit",
    element: <WorkoutEditPage />,
  },
  {
    path: "/workouts/edit/:workoutId",
    element: <WorkoutEditPage />,
  },
  {
    path: "/programs",
    element: <ProgramPage />,
  },

  {
    path: "/programs/edit",
    element: <ProgramEdit />,
    children: [
      {
        path: "workouts/edit",
        element: <WorkoutEditPage />,
      },
    ],
  },
  {
    path: "/programs/edit/:programId",
    element: <ProgramEdit />,
  },
  {
    path: "/programs/:programId",
    element: <ProgramDetails />,
  },
  {
    path: "/exercises",
    element: <ExercisePage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
    children: [],
  },
];
