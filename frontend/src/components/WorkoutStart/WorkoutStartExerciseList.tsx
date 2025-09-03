import React, { useMemo } from "react";

import WorkoutStartExerciseItem from "./WorkoutStartExerciseItem";

import GenericList from "../UI/GenericList";

import type {
  IUserWorkoutDTO,
  IUserWorkoutExercisesEditDTO,
} from "../../../../shared/models/userWorkout";
import type { TErrors, TValidationError } from "../../models/errors.model";
import type { ExerciseType } from "../../../../backend/prisma/generated/prisma";
import type { IHandleUserSetSkipProps } from "../../models/workoutStart.model";

interface IItemProps {
  handleUserStrengthSetsChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleUserCardioSetsChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleUserSet: (userSetId?: string, type?: ExerciseType) => void;
  completeAllExerciseSets: (userWorkoutExerciseId: string) => void;
  skipAllExerciseSets: ({
    userWorkoutExerciseId,
    skippedReason,
  }: Omit<IHandleUserSetSkipProps, "userSetId">) => void;
  handleUserSetSkip: ({
    userWorkoutExerciseId,
    userSetId,
    skippedReason,
  }: IHandleUserSetSkipProps) => void;
}

interface IWorkoutStartExerciseListProps {
  userWorkoutExercises: IUserWorkoutExercisesEditDTO[];
  errors: TErrors<IUserWorkoutDTO> | null;
  itemProps: IItemProps;
}
export default function WorkoutStartExerciseList({
  userWorkoutExercises,
  errors,
  itemProps,
}: IWorkoutStartExerciseListProps) {
  const sortedWorkoutExercises = useMemo(
    () =>
      userWorkoutExercises
        ?.map((uwe, idx) => ({
          userWorkoutExercise: uwe,
          errors:
            (errors?.userWorkoutExercises?.[
              idx
            ] as TValidationError<IUserWorkoutExercisesEditDTO>) || undefined,
        }))
        .sort(
          (a, b) => a.userWorkoutExercise.order! - b.userWorkoutExercise.order!
        ) ?? [],
    [userWorkoutExercises,errors]
  );

  const listItemProps = useMemo(() => {
    return {...itemProps};
  }, [itemProps]);
  return (
    <GenericList
      items={sortedWorkoutExercises}
      ItemComponent={WorkoutStartExerciseItem}
      itemComponentProps={listItemProps}
      getKey={(we) => we.userWorkoutExercise.id!}
      ulStyle=" flex flex-col  gap-2 px-mobile"
    />
  );
}
