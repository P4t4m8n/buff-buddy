import type { IWorkoutFilter } from "../../../shared/models/workout.model";

export const INITIAL_WORKOUT_FILTER: IWorkoutFilter = {
  programId: null,
  dayOfWeek: null,
  exerciseId: null,
  isCompleted: null,
  isTemplate: true,
  skip: 0,
  take: 50,
};
