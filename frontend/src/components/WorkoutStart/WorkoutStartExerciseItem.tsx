import type { IWorkoutStartExercisesDTO } from "../../../../shared/models/workoutStart.model";

interface IWorkoutStartExerciseItemProps {
  item: IWorkoutStartExercisesDTO;
}
export default function WorkoutStartExerciseItem({
  item: workoutStart,
}: IWorkoutStartExerciseItemProps) {
  console.log("🚀 ~ WorkoutStartExerciseItem ~ workoutExercise:", workoutStart);
  const { id, exercise, coreSets, notes, userSets } = workoutStart;
  const { youtubeUrl } = exercise ?? {};

  const isFinished = userSets.reduce((acc, set) => {
    return acc && !!set?.isCompleted;
  }, true);
  return (
    <li
      className={`border rounded ${
        isFinished ? "border-green-500" : ""
      }  grid ${
        isOpen ? "h-full" : "h-20 min-h-20 overflow-hidden "
      } gap-4 p-2 transition-all duration-300 w-full`}
    >
      <Button
        onClick={handleModel}
        className={`w-full inline-flex items-center h-16 ${
          isOpen ? "border-b pb-2" : ""
        }`}
      >
        <span className="inline-flex flex-col text-start">
          <h4>{exercise.name}</h4>
          <p>Sets: {sets.length}</p>
        </span>
        <IconArrow
          className={`w-8 aspect-square ml-auto ${
            isOpen ? "rotate-180" : ""
          }  transition-all duration-300`}
        />
      </Button>

      <div
        className={`${
          isOpen ? "grid opacity-100" : " opacity-0"
        } gap-2 justify-items-center w-full h-full overflow-hidden transition-all duration-300`}
      >
        <WorkoutExerciseVideo youtubeUrl={youtubeUrl} />

        <WorkoutExerciseList
          sets={sets}
          handleUserSetsChange={handleUserSetsChange}
          logUserSet={logUserSet}
          workoutExerciseErrors={workoutExerciseErrors}
          fillAllSets={fillAllSets}
        />
        <div className="flex w-full gap-8">
          <Button
            className="text-amber  hover:text-black w-full"
            buttonStyle="model"
            type="button"
            onClick={fillAllSets}
          >
            Fill All Sets
          </Button>
          <Button
            className="text-amber  hover:text-black w-full"
            buttonStyle="model"
            type="button"
            onClick={completeAllUserSets}
          >
            Complete All Sets
          </Button>
        </div>
      </div>
    </li>
  );
}
