import { createContext } from "react";
import type { useWorkoutStart } from "../features/workoutStart/useWorkoutStart";

export type TWorkoutStartContext = ReturnType<typeof useWorkoutStart> | null;

export const WorkoutStartContext = createContext<TWorkoutStartContext>(null);
