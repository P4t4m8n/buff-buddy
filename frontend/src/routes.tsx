//Lib
import { Route } from "react-router";
//Pages
import HomePage from "./pages/HomePage";
import ProgramPage from "./pages/Program/ProgramPage";
import AdminPage from "./pages/AdminPage";
import ProgramDetails from "./pages/Program/ProgramDetails";
import WorkoutPage from "./pages/Workout/WorkoutPage";
import WorkoutDetailsPage from "./pages/Workout/WorkoutDetailsPage";
import WorkoutStartPage from "./pages/WorkoutStart/WorkoutStartPage";
import WorkoutEditPage from "./pages/Workout/WorkoutEditPage";
import WorkoutListPage from "./pages/Workout/WorkoutListPage";
import ProgramEditPage from "./pages/Program/ProgramEditPage";
import ExercisePage from "./pages/Exercise/ExercisePage";
import ExerciseEditPage from "./pages/Exercise/ExerciseEditPage";
import ExerciseDetailsPage from "./pages/Exercise/ExerciseDetailsPage";
import AuthPage from "./pages/AuthPage";
//Consts
import { ROUTES_STORE } from "./consts/routes.const";
//Types
import type { ReactNode } from "react";
import ProfileWorkoutPage from "./pages/Profile/ProfileWorkoutPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProfileExercisePage from "./pages/Profile/ProfileExercisePage";
import ProfileEditPage from "./pages/Profile/ProfileEditPage";

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

const PROFILE_ROUTES: RouteConfig[] = [
  {
    path: ROUTES_STORE.PROFILE_PAGE_ROUTE,
    element: <ProfilePage />,
  },
  {
    path: ROUTES_STORE.PROFILE_EDIT_ROUTE,
    element: <ProfileEditPage />,
  },
  {
    path: ROUTES_STORE.PROFILE_WORKOUT_ROUTE,
    element: <ProfileWorkoutPage />,
  },
  {
    path: ROUTES_STORE.PROFILE_EXERCISE_ROUTE,
    element: <ProfileExercisePage />,
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
    path: "/admin",
    element: <AdminPage />,
  },
  ...PROFILE_ROUTES,
];
