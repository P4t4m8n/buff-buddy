import type { MouseEvent } from "react";
import Button from "../UI/Button";
import type { IWorkoutDTO } from "../../../../shared/models/workout.model";

interface WorkoutPreviewProps {
  workout: IWorkoutDTO;
  onSelectWorkout?: (workout?: IWorkoutDTO) => void;
  detailsModelComponent?: React.ComponentType<unknown>;
  isSelected?: boolean;
  mode?: "programAdd" | "programView" | "workoutStart";
}

type WorkoutPreviewMode = "programAdd" | "programView" | "workoutStart";

//TODO?? Improve exercises names flex to have scroll btns
//TODO?? Add dynamic preview based on location. When adding to a program details,when show a program edit and details and when starting a workout details edit and start workout
export default function DynamicWorkoutPreview({
  workout,
  onSelectWorkout,
  mode = "programAdd",
}: WorkoutPreviewProps) {
  const { name, workoutExercises } = workout;

  const exercisesNames =
    workoutExercises?.map((ex) => {
      const name = ex.exercise?.name;
      return (
        <li
          className="border rounded-4xl px-2 py-1 min-w-fit shadow bg-main-black text-main-orange shadow-black"
          key={name}
        >
          {name}
        </li>
      );
    }) ?? [];

  const getActions = (mode: WorkoutPreviewMode) => {
    switch (mode) {
      case "programAdd":
        return (
          <ProgramWorkoutEditActions
            workout={workout}
            onSelectWorkout={onSelectWorkout}
          />
        );
      case "programView":
        return <></>;
      case "workoutStart":
        return <></>;
      default:
        return null;
    }
  };
  return (
    <li className="p-2 border rounded grid gap-2">
      <h4>{name}</h4>
      <ul className="flex w-full overflow-auto gap-2 py-2">
        {...exercisesNames}
      </ul>
      {getActions(mode)}
    </li>
  );
}

const ProgramWorkoutEditActions = ({
  onSelectWorkout,
  workout,
}: Partial<WorkoutPreviewProps>) => {
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSelectWorkout) {
      onSelectWorkout(workout);
    }
  };
  return (
    <div>
      <Button
        className={`bg-inherit border-1 w-full hover:bg-main-orange h-10 mt-auto
              hover:text-white rounded transition-all duration-300
              hover:cursor-pointer  `}
        onClick={onClick}
      >
        Select
      </Button>
    </div>
  );
};
