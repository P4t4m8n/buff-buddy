import type { ReactNode } from "react";
import { Route } from "react-router";
import HomePage from "./pages/HomePage";
import WorkoutPage from "./pages/WorkoutPage";
import ProgramPage from "./pages/Program/ProgramPage";
import ExercisePage from "./pages/ExercisePage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import ExerciseInfoIndex from "./components/Admin/ExerciseInfo/ExerciseInfoIndex";
import ProgramEdit from "./pages/Program/ProgramEdit";
import ProgramDetails from "./pages/Program/ProgramDetails";

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
    path: "/programs",
    element: <ProgramPage />,
    children: [
      {
        path: ":id",
        element: <ProgramDetails />,
      },
      {
        path: "edit",
        element: <ProgramEdit />,
      },
      {
        path: "edit/:id",
        element: <ProgramEdit />,
      },
    ],
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
    children: [
      {
        path: "exercise-info/:type",
        element: <ExerciseInfoIndex />,
      },
    ],
  },
];
