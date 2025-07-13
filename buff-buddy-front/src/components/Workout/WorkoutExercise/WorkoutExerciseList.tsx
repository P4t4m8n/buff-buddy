import { Fragment } from "react/jsx-runtime";
import type { IWorkoutSets } from "../../../models/workout.model";
import WorkoutExerciseListItem from "./WorkoutExerciseListItem";

interface IWorkoutExerciseListProps {
  sets: IWorkoutSets[];
  handleUserSetsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logUserSet: (id?: string) => void;
  workoutExerciseErrors: Array<Record<string, Record<string, string>>>;
  fillAllSets?: (coreSetId: string) => void;
}
export default function WorkoutExerciseList({
  sets,
  handleUserSetsChange,
  logUserSet,
  workoutExerciseErrors,
  fillAllSets,
}: IWorkoutExerciseListProps) {
  return (
    <ul className="grid grid-cols-1 grid-rows-[repeat(auto-fill,11.5rem)] lg:grid-rows-[repeat(auto-fill,14rem)] h-full overflow-auto gap-3 w-full">
      {sets.map((set) => (
        <Fragment key={set.coreSet.id}>
          {/*TODO?? ugly errors handling improve later. 
             move into a function that build the sets array with everything ready */}
          <WorkoutExerciseListItem
            sets={set}
            handleUserSetsChange={handleUserSetsChange}
            logUserSet={logUserSet}
            fillAllSets={fillAllSets}
            errors={
              workoutExerciseErrors.find(
                (error) => Object.keys(error)[0] === set.userSet.id
              )?.[set.userSet?.id || ""] || {}
            }
          />
        </Fragment>
      ))}
    </ul>
  );
}
