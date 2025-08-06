import type { IWorkoutStartExerciseItemProps } from "../../models/workoutStart.model";
import WorkoutStartExerciseCardio from "./WorkoutStartExerciseCardio";
import WorkoutStartExerciseStrength from "./WorkoutStartExerciseStrength";

export default function WorkoutStartExerciseItem(
  props: IWorkoutStartExerciseItemProps
) {
  const type = props.item.exercise?.type;

  switch (type) {
    case "cardio":
      return <WorkoutStartExerciseCardio {...props} />;
    case "strength":
      return <WorkoutStartExerciseStrength {...props} />;
    default:
      return (
        <div className="text-red-500">Unsupported exercise type: {type}</div>
      );
  }
}
