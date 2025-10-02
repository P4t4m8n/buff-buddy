import type { IBaseFilter } from "../../../shared/models/app.model";
import type { IExerciseFilter } from "../../../shared/models/exercise.model";
import type { IProgramFilter } from "../../../shared/models/program.model";
import type { IWorkoutFilter } from "../../../shared/models/workout.model";

const PAGINATION_FILTER: IBaseFilter = {
  skip: 0,
  take: 10,
};

const INITIAL_WORKOUT_FILTER: IWorkoutFilter = {
  ...PAGINATION_FILTER,
  programName: "",
  exerciseName: "",
  ownerName: "",
  workoutName: "",
  programId: "",
  exerciseId: "",
  isTemplate: "",
};

const INITIAL_EXERCISE_FILTER: IExerciseFilter = {
  ...PAGINATION_FILTER,
  name: "",
};

const INITIAL_PROGRAM_FILTER: IProgramFilter = {
  ...PAGINATION_FILTER,
  name: "",
  isActive: true,
};

export const INITIAL_FILTERS = {
  PAGINATION_FILTER,
  INITIAL_WORKOUT_FILTER,
  INITIAL_EXERCISE_FILTER,
  INITIAL_PROGRAM_FILTER,
};
