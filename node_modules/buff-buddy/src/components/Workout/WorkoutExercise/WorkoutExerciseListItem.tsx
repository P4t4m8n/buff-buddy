import type { IWorkoutSets } from "../../../models/workout.model";
import WorkoutExerciseCoreSet from "./WorkoutExerciseCoreSet";
import WorkoutExerciseUserSet from "./WorkoutExerciseUserSet";

interface IWorkoutExerciseListItemProps {
  sets: IWorkoutSets;
  errors?: Record<string, string>;
  handleUserSetsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logUserSet: (id?: string) => void;
  fillAllSets?: (coreSetId: string) => void;
}
export default function WorkoutExerciseListItem({
  sets,
  handleUserSetsChange,
  logUserSet,
  errors,
  
}: IWorkoutExerciseListItemProps) {
  const { coreSet, userSet } = sets;
  return (
    <li
      key={coreSet.id}
      className="grid content-between h-[11.5rem] lg:h-56 font-thin not-last:border-b py-2 overflow-hidden"
    >
      <WorkoutExerciseCoreSet coreSet={coreSet} />
      <WorkoutExerciseUserSet
        userSet={userSet}
        handleUserSetsChange={handleUserSetsChange}
        logUserSet={logUserSet}
        errors={errors}
      />
    </li>
  );
}
