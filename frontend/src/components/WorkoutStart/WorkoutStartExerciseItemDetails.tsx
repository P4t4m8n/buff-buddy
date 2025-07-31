import WorkoutStartExerciseCoreSets from "./WorkoutStartExerciseCoreSets";
import WorkoutStartExerciseItemNotes from "./WorkoutStartExerciseItemNotes";
import WorkoutStartExerciseVideo from "./WorkoutStartExerciseVideo";
import WorkoutStartUserSetList from "./WorkoutStartUserSetList";

import Button from "../UI/Button";

import { twMerge } from "tailwind-merge";

import type { IUserWorkoutExercisesDTO } from "../../../../shared/models/userWorkout";

interface IWorkoutStartExerciseItemDetailsProps {
  workoutStart: IUserWorkoutExercisesDTO;
  isOpen?: boolean;
  handleUserSetsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logUserSet: (id?: string) => void;
  completeAllExerciseSets: (id: string) => void;
}
export default function WorkoutStartExerciseItemDetails({
  workoutStart,
  isOpen,
  handleUserSetsChange,
  logUserSet,
  completeAllExerciseSets,
}: IWorkoutStartExerciseItemDetailsProps) {
  const { id, exercise, coreSet, notes, userSets } = workoutStart;
  const { youtubeUrl } = exercise ?? {};

  const isOpenClass = isOpen
    ? " flex flex-col opacity-100 h-fit pb-4"
    : " opacity-0 h-auto";
  const divClass = twMerge(
    isOpenClass,
    "gap-2 justify-items-center w-full transition-all duration-500 relative"
  );
  const noteComponent = notes ? (
    <WorkoutStartExerciseItemNotes notes={notes} />
  ) : null;

  return (
    <div className={divClass}>
      <WorkoutStartExerciseVideo youtubeUrl={youtubeUrl} />
      {noteComponent}
      <WorkoutStartExerciseCoreSets coreSet={coreSet} />
      <WorkoutStartUserSetList
        userSets={userSets}
        handleUserSetsChange={handleUserSetsChange}
        logUserSet={logUserSet}
      />

      <div className="flex w-full gap-8">
        <Button
          className="text-amber hover:text-black w-full opacity-50 cursor-not-allowed"
          buttonStyle="model"
          disabled={true}
          type="button"
        >
          ***Skip***
        </Button>
        <Button
          className="text-amber hover:text-black w-full"
          buttonStyle="model"
          type="button"
          onClick={() => completeAllExerciseSets(id!)}
        >
          Complete All Sets
        </Button>
      </div>
    </div>
  );
}
