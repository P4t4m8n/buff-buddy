import type { IWorkoutExerciseEditDTO } from "../../../../../../shared/models/workout.model";
import GenericList from "../../../UI/GenericList";
import WorkoutExerciseEditListItem from "./WorkoutExerciseEditListItem";

interface IWorkoutExerciseEditListProps {
  workoutExercises?: IWorkoutExerciseEditDTO[];
  handleWorkoutExercises: (workoutExercise: IWorkoutExerciseEditDTO) => void;
}
export default function WorkoutExerciseEditList({
  workoutExercises,
  handleWorkoutExercises,
}: IWorkoutExerciseEditListProps) {
  return (
    <GenericList
      items={workoutExercises ?? []}
      getKey={(we) => we.id!}
      ulStyle="flex justify-around items-center h-full text-white"
      ItemComponent={WorkoutExerciseEditListItem}
      itemComponentProps={{ handleWorkoutExercises }}
    />
  );
}
