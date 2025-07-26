import type { IWorkoutDTO } from "../../../../../shared/models/workout.model";
import Button from "../../UI/Button";
import WorkoutTags from "../../Workout/WorkoutTags";

interface IAvailableWorkoutPreviewProps {
  item: IWorkoutDTO;
  onSelectProgramWorkout: (
    e: React.MouseEvent<HTMLButtonElement>,
    workout?: IWorkoutDTO,
    isCopy?: boolean
  ) => void;
}
export default function AvailableWorkoutPreview({
  item: workout,
  onSelectProgramWorkout,
}: IAvailableWorkoutPreviewProps) {
  const { name, workoutExercises } = workout;

  const isCopy = true;

  return (
    <li className="p-2 border rounded grid gap-2">
      <h4>{name}</h4>
      <WorkoutTags workoutExercises={workoutExercises} />

      <div className="flex gap-2">
        <Button
          buttonStyle="save"
          onClick={(e) => onSelectProgramWorkout(e, workout, isCopy)}
        >
          Copy
        </Button>
        <Button
          buttonStyle="save"
          onClick={(e) => onSelectProgramWorkout(e, workout, !isCopy)}
        >
          Select
        </Button>
      </div>
    </li>
  );
}
