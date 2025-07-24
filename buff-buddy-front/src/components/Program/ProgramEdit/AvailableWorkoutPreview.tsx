import type { IProgramWorkoutEditDTO } from "../../../../../shared/models/program.model";
import type { IWorkoutDTO } from "../../../../../shared/models/workout.model";
import Button from "../../UI/Button";
import WorkoutTags from "../../Workout/WorkoutTags";

interface IAvailableWorkoutPreviewProps {
  item: IWorkoutDTO;
  handleProgramWorkouts?: (workout: IProgramWorkoutEditDTO) => void;
}
export default function AvailableWorkoutPreview({
  item: workout,
  handleProgramWorkouts,
}: IAvailableWorkoutPreviewProps) {
  console.log("🚀 ~ AvailableWorkoutPreview ~ workout:", workout);
  const { name, workoutExercises } = workout;

  const isCopy = true;
  const onClick = (e: React.MouseEvent<HTMLButtonElement>, isCopy: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    if (!handleProgramWorkouts) {
      console.warn("onSelectWorkout function is not provided");
      return;
    }

    handleProgramWorkouts(workout, isCopy);
  };
  return (
    <li className="p-2 border rounded grid gap-2">
      <h4>{name}</h4>
      <WorkoutTags workoutExercises={workoutExercises} />

      <div className="flex gap-2">
        <Button buttonStyle="save" onClick={(e) => onClick(e, isCopy)}>
          Copy
        </Button>
        <Button buttonStyle="save" onClick={(e) => onClick(e, !isCopy)}>
          Select
        </Button>
      </div>
    </li>
  );
}
