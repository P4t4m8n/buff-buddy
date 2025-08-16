import type { ExerciseType } from "../../../backend/prisma/generated/prisma";
import type { IUserWorkoutExercisesEditDTO } from "../../../shared/models/userWorkout";
import type { TValidationError } from "./errors.model";

export interface IWorkoutStartExerciseItemProps {
  item: {
    userWorkoutExercise: IUserWorkoutExercisesEditDTO;
    errors?: TValidationError<IUserWorkoutExercisesEditDTO>;
  };

  handleUserStrengthSetsChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleUserCardioSetsChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleUserSet: (userSetId?: string, type?: ExerciseType) => void;
  completeAllExerciseSets: (id: string) => void;
}
