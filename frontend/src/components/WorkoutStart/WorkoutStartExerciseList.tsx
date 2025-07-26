import type { IWorkoutStartExercisesDTO } from "../../../../shared/models/workoutStart.model";
import GenericList from "../UI/GenericList";
import WorkoutStartExerciseItem from "./WorkoutStartExerciseItem";

interface IWorkoutStartExerciseListProps {
  workoutExercises: IWorkoutStartExercisesDTO[];
}
export default function WorkoutStartExerciseList({
  workoutExercises,
}: IWorkoutStartExerciseListProps) {
  return (
    <GenericList
      items={workoutExercises ?? []}
      ItemComponent={WorkoutStartExerciseItem}
      getKey={(we) => we.id!}
    />
  );
}
