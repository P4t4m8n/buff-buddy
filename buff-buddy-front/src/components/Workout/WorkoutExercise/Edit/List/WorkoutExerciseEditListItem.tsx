import type { IWorkoutExerciseEditDTO } from "../../../../../models/workout.model";
import WorkoutExerciseEditModel from "../WorkoutExerciseEditModel";

interface WorkoutExerciseEditListItemProps {
  workoutExercise: IWorkoutExerciseEditDTO;
  handleWorkoutExercise: (workoutExercise: IWorkoutExerciseEditDTO) => void;
  gridCols: string;
}
export default function WorkoutExerciseEditListItem({
  workoutExercise,
  handleWorkoutExercise,
  gridCols,
}: WorkoutExerciseEditListItemProps) {
  const { id, exercise, order, coreSets } = workoutExercise;
  const { name } = exercise || {};
  return (
    <li
      key={id}
      className={`not-last:border-b w-full grid ${gridCols}
                   items-center rounded`}
    >
      <p className="text-center">{order}</p>
      <h5 className="font-medium">{name}</h5>
      <p className="text-center">{coreSets?.length}</p>
      <div className="justify-self-center  w-fit">
        <WorkoutExerciseEditModel
          workoutExercise={workoutExercise}
          handleWorkoutExercise={handleWorkoutExercise}
        />
      </div>
    </li>
  );
}
