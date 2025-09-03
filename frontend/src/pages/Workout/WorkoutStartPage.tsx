import { useParams } from "react-router";

import { useWorkoutStore } from "../../store/workout.store";
import { useWorkoutStart } from "../../hooks/features/workout/useWorkoutStart";
import { usePageBack } from "../../hooks/shared/usePageBack";

import WorkoutStartExerciseList from "../../components/WorkoutStart/WorkoutStartExerciseList";

import Button from "../../components/UI/Button";
import GenericSaveButton from "../../components/UI/GenericSaveButton";
import Loader from "../../components/UI/loader/Loader";
import DateInput from "../../components/UI/Form/DateInput/DateInput";

export default function WorkoutStartPage() {
  const { programId, workoutId } = useParams<{
    programId?: string;
    workoutId?: string;
  }>();

  const { onBack } = usePageBack();

  const {
    errors,
    workoutStart,
    isLoadingId,
    onSubmit,
    handleDateSelect,
    handleUserStrengthSetsChange,
    handleUserCardioSetsChange,
    handleUserSet,
    completeAllExerciseSets,
    skipAllExerciseSets,
    handleUserSetSkip,
  } = useWorkoutStart({ workoutId, programId, onBack });

  if (isLoadingId) {
    return <Loader loaderType="screen" />;
  }

  const { userWorkoutExercises, workout } = workoutStart ?? {};
  const { name } = workout ?? {};

  const listItemProps = {
    handleUserStrengthSetsChange,
    handleUserCardioSetsChange,
    handleUserSet,
    completeAllExerciseSets,
    skipAllExerciseSets,
    handleUserSetSkip,
  };

  return (
    <form
      onSubmit={onSubmit}
      className=" h-main overflow-y-auto  grid grid-cols-1 grid-rows-[5.5rem_1fr_2.5rem]
       gap-4 bg-black-800 pt-mobile"
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
      <WorkoutStartExerciseList
        userWorkoutExercises={userWorkoutExercises ?? []}
        errors={errors}
        itemProps={listItemProps}
      />

      <div className="grid grid-cols-[auto_4rem] h-10 px-mobile ">
        <Button buttonStyle="warning" type="button" onClick={onBack}>
          Cancel
        </Button>
        <GenericSaveButton
          itemId={workoutId}
          useStore={useWorkoutStore}
          type="submit"
        />
      </div>
    </form>
  );
}
