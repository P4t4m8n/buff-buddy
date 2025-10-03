import { useWorkoutStart } from "../../hooks/features/workoutStart/useWorkoutStart";
import { usePageBack } from "../../hooks/shared/usePageBack";

import Button from "../../components/UI/Button";
import GenericSaveButton from "../../components/UI/GenericSaveButton";
import Loader from "../../components/UI/loader/Loader";
import DateInput from "../../components/UI/Form/DateInput/DateInput";
import { WorkoutStartContext } from "../../hooks/context/WorkoutStartContext";
import { useMemo } from "react";
import type { IUserWorkoutExercisesEditDTO } from "../../../../shared/models/userWorkout";
import type { TValidationError } from "../../models/errors.model";
import GenericList from "../../components/UI/GenericList";
import WorkoutStartExerciseItem from "./WorkoutStartExercise";

interface IWorkoutStartProps {
  workoutId?: string;
}
export default function WorkoutStart({ workoutId }: IWorkoutStartProps) {
  const { onBack } = usePageBack();

  const useWorkoutStartHook = useWorkoutStart({ workoutId, onBack });
  const {
    isLoading,
    workoutStart,
    onSubmit,
    handleDateSelect,
    errors,
    isSaving,
  } = useWorkoutStartHook;

  const { userWorkoutExercises, workout } = workoutStart ?? {};

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
  const { name } = workout ?? {};

  if (isLoading) {
    return <Loader loaderType="screen" />;
  }
  return (
    <form
      onSubmit={onSubmit}
      className="h-full pb-2 overflow-y-auto grid grid-cols-1 grid-rows-[5.5rem_1fr_2.5rem]
         gap-4 bg-black-800 px-desktop"
    >
      <div className="px-mobile">
        <h2 className="text-center text-xl underline underline-offset-2 pb-4">
          {name}
        </h2>
        <DateInput
          handleDateSelect={handleDateSelect}
          selectedRange={{ start: workoutStart?.dateCompleted }}
          className=" "
          initialMode="single"
          errorRange={{
            startDate: errors?.dateCompleted,
          }}
        />
      </div>
      <WorkoutStartContext value={useWorkoutStartHook}>
        <GenericList
          items={sortedWorkoutExercises}
          ItemComponent={WorkoutStartExerciseItem}
          getKey={(we) => we.userWorkoutExercise.id!}
          ulStyle=" flex flex-col h-full  gap-2 px-mobile overflow-y-auto"
        />
      </WorkoutStartContext>

      <div className="grid grid-cols-[auto_4rem] h-10 px-mobile ">
        <Button buttonStyle="warning" type="button" onClick={onBack}>
          Cancel
        </Button>
        <GenericSaveButton isSaving={isSaving} />
      </div>
    </form>
  );
}
