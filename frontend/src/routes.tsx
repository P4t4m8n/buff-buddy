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
import WorkoutStartPage from "./components/WorkoutStart/WorkoutStartPage";

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
    children: [
      {
        path: "/workouts/:id",
        element: <WorkoutDetailsPage />,
      },
      {
        path: "/workouts/workout-start/:programId/:workoutId",
        element: <WorkoutStartPage />,
      },
    ],
  },

  {
    path: "/programs",
    element: <ProgramPage />,
  },

  {
    path: "/programs/edit",
    element: <ProgramEdit />,
  },
  {
    path: "/programs/edit/:id",
    element: <ProgramEdit />,
  },
  {
    path: "/programs/:id",
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
