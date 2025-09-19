import type { ExerciseType } from "../../../backend/prisma/generated/prisma";
import type { IUserWorkoutExercisesEditDTO } from "../../../shared/models/userWorkout";
import type { TValidationError } from "./errors.model";

export interface IWorkoutStartExerciseItemProps {
  item: {
    userWorkoutExercise: IUserWorkoutExercisesEditDTO;
    errors?: TValidationError<IUserWorkoutExercisesEditDTO>;
  };

  handleUserSetsChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  handleUserSet: (userSetId?: string, type?: ExerciseType) => void;
  completeAllExerciseSets: (id: string) => void;
  skipAllExerciseSets: ({
    userWorkoutExerciseId,
    skippedReason,
  }: Omit<IHandleUserSetSkipProps, "userSetId">) => void;

  handleUserSetSkip: ({
    userWorkoutExerciseId,
    userSetId,
    skippedReason,
  }: IHandleUserSetSkipProps) => void;
  userWorkoutExerciseId?: string;
}

export type TItemProps = Omit<IWorkoutStartExerciseItemProps, "item">;

export type TWorkoutStartUserSetsProps<T> = TItemProps & {
  item: T;
  errors?: TValidationError<T>;
};
export interface IHandleUserSetSkipProps {
  userWorkoutExerciseId: string;
  skippedReason: string;
  userSetId?: string;
}
