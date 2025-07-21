import type { IWorkoutExerciseEditDTO } from "../../../../../../shared/models/workout.model";
import GenericModel from "../../../UI/GenericModel";
import WorkoutExerciseEdit from "./WorkoutExerciseEdit";

interface WorkoutExerciseEditListItemProps {
  workoutExercise?: IWorkoutExerciseEditDTO;
  handleWorkoutExercises: (workoutExercise: IWorkoutExerciseEditDTO) => void;
}
export default function WorkoutExerciseEditListItem({
  workoutExercise,
  handleWorkoutExercises,
}: WorkoutExerciseEditListItemProps) {
  const { id, exercise, order, coreSets } = workoutExercise!;
  const { name } = exercise || {};
  return (
    <li
      key={id}
      className={`not-last:border-b w-full grid 
                   items-center rounded`}
    >
      <p className="text-center">{order}</p>
      <h5 className="font-medium">{name}</h5>
      <p className="text-center">{coreSets?.length}</p>
      <GenericModel
        Model={WorkoutExerciseEdit}
        modelProps={{ handleWorkoutExercises, workoutExercise }}
        mode="create"
        buttonProps={{ buttonStyle: "model", className: "" }}
      />
    </li>
  );
}
