//Components
import WorkoutExerciseEditListItem from "../WorkoutExerciseEditListItem";
//UI
import GenericList from "../../../UI/GenericList";
//Types
import type { IWorkoutExerciseEditDTO } from "../../../../../../shared/models/workout.model";

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
      ulStyle="flex flex-col gap-2 h-full overflow-y-auto"
      ItemComponent={WorkoutExerciseEditListItem}
      itemComponentProps={{ handleWorkoutExercises }}
      NoItemsComponent={NoItemsComponent}
    />
  );
}

const NoItemsComponent = () => (
  <p className="text-center">No exercises picked yet </p>
);
