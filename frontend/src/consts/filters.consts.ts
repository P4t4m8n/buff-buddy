import type { IWorkoutFilter } from "../../../shared/models/workout.model";

export const INITIAL_WORKOUT_FILTER: IWorkoutFilter = {
  programName: "",
  exerciseName: "",
  ownerName: "",
  workoutName: "",
  programId: "",
  exerciseId: "",
  isTemplate: "",
  skip: 0,
  take: 50,
};
