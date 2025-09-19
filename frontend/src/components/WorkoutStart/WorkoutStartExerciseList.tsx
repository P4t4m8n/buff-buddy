import { useMemo } from "react";

import WorkoutStartExerciseItem from "./WorkoutStartExerciseItem";

import GenericList from "../UI/GenericList";

import type {
  IUserWorkoutDTO,
  IUserWorkoutExercisesEditDTO,
} from "../../../../shared/models/userWorkout";
import type { TErrors, TValidationError } from "../../models/errors.model";
import type { TItemProps } from "../../models/workoutStart.model";

interface IWorkoutStartExerciseListProps {
  userWorkoutExercises: IUserWorkoutExercisesEditDTO[];
  errors: TErrors<IUserWorkoutDTO> | null;
  itemProps: TItemProps;
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
    [userWorkoutExercises, errors]
  );

  const listItemProps = useMemo(() => {
    return { ...itemProps };
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
