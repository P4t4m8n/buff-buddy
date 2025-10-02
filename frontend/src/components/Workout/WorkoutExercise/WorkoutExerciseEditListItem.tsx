//Utils
import { toTitle } from "../../../utils/toTitle";
//Components
import WorkoutExerciseEdit from "./WorkoutExerciseEdit/WorkoutExerciseEdit";
//UI
import GenericModel from "../../UI/GenericModel";
//Types
import type { IWorkoutExerciseEditDTO } from "../../../../../shared/models/workout.model";

interface WorkoutExerciseEditListItemProps {
  item?: IWorkoutExerciseEditDTO;
  handleWorkoutExercises: (workoutExercise: IWorkoutExerciseEditDTO) => void;
}
export default function WorkoutExerciseEditListItem({
  item: workoutExercise,
  handleWorkoutExercises,
}: WorkoutExerciseEditListItemProps) {
  const { id, exercise, order } = workoutExercise!;
  const { name } = exercise || {};
  return (
    <li
      key={id}
      className=" w-full flex  border items-center rounded p-1 gap-2"
    >
      <p className="text-center">{order}.</p>
      <h5 className="font-medium text-xl">{toTitle(name)}</h5>
      <GenericModel
        Model={WorkoutExerciseEdit}
        modelProps={{ handleWorkoutExercises, workoutExercise }}
        mode="create"
        buttonProps={{ buttonStyle: "model", className: "ml-auto" }}
      />
    </li>
  );
}
