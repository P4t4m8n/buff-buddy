import type { IUserWorkoutExercisesDTO } from "../../../../shared/models/workoutStart.model";
import GenericList from "../UI/GenericList";
import WorkoutStartExerciseItem from "./WorkoutStartExerciseItem";

interface IWorkoutStartExerciseListProps {
  workoutExercises: IUserWorkoutExercisesDTO[];
  handleUserSetsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logUserSet: (id?: string) => void;
  completeAllExerciseSets: (id: string) => void;
}
export default function WorkoutStartExerciseList({
  workoutExercises,
  handleUserSetsChange,
  logUserSet,
  completeAllExerciseSets,
}: IWorkoutStartExerciseListProps) {
  return (
    <GenericList
      items={workoutExercises ?? []}
      ItemComponent={WorkoutStartExerciseItem}
      itemComponentProps={{
        handleUserSetsChange,
        logUserSet,
        completeAllExerciseSets,
      }}
      getKey={(we) => we.id!}
      ulStyle="h-full flex flex-col overflow-y-auto  gap-2"
    />
  );
}
