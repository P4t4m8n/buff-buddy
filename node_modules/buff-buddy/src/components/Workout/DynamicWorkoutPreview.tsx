import type { MouseEvent } from "react";
import Button from "../UI/Button";
import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
} from "../../../../shared/models/workout.model";
import GenericModel from "../UI/GenericModel";
import ProgramWorkoutEdit from "../Program/ProgramWorkoutEdit/ProgramWorkoutEdit";
import { workoutUtils } from "../../utils/workout.util";

interface WorkoutPreviewProps {
  item?: IWorkoutDTO;
  onSelectWorkout?: (workout?: IWorkoutDTO, isCopy?: boolean) => void;
  handleWorkouts?: (workout: IWorkoutEditDTO) => void;
  pageName?: TWorkoutPreviewPageName;
  isSelected?: boolean;
}

export type TWorkoutPreviewPageName =
  | "programAdd"
  | "programView"
  | "workoutStart"
  | "ProgramEdit"
  | "ProgramWorkoutSelected";

//TODO?? Improve exercises names flex to have scroll btns
//TODO?? Add dynamic preview based on location. When adding to a program details,when show a program edit and details and when starting a workout details edit and start workout
export default function DynamicWorkoutPreview({
  item: workout,
  onSelectWorkout,
  pageName = "programAdd",
  isSelected,
  handleWorkouts,
}: WorkoutPreviewProps) {
  if (!workout) return null;

  const getComponent = (pageName: TWorkoutPreviewPageName) => {
    switch (pageName) {
      case "programAdd":
        return (
          <ProgramWorkoutEditPreview
            onSelectWorkout={onSelectWorkout}
            item={workout}
            isSelected={isSelected}
          />
        );
      case "programView":
        return <></>;
      case "workoutStart":
        return <></>;
      case "ProgramWorkoutSelected":
        return (
          <ProgramWorkoutSelected
            item={workout}
            handleWorkouts={handleWorkouts}
          />
        );
      case "ProgramEdit":
        return <ProgramEdit item={workout} handleWorkouts={handleWorkouts} />;
      default:
        return null;
    }
  };
  return getComponent(pageName);
}

const ProgramWorkoutEditPreview = ({
  onSelectWorkout,
  item: workout,
  isSelected,
}: Partial<WorkoutPreviewProps>) => {
  const { name, workoutExercises } = workout!;

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

  const isCopy = true;
  const onClick = (e: MouseEvent<HTMLButtonElement>, isCopy: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    if (!onSelectWorkout) {
      console.warn("onSelectWorkout function is not provided");
      return;
    }

    if (isSelected) {
      onSelectWorkout();
      return;
    }
    onSelectWorkout(workout, isCopy);
  };
  return (
    <li className="p-2 border rounded grid gap-2">
      <h4>{name}</h4>
      <ul className="flex w-full overflow-auto gap-2 py-2">
        {...exercisesNames}
      </ul>
      {isSelected ? (
        <Button buttonStyle="save" className="w-full" onClick={(e) => onClick(e, isCopy)}>
          Cancel
        </Button>
      ) : (
        <div className="flex gap-2">
          <Button
            className={`bg-inherit border-1 w-full hover:bg-main-orange h-10 mt-auto
            hover:text-white rounded transition-all duration-300
            hover:cursor-pointer  `}
            onClick={(e) => onClick(e, isCopy)}
          >
            Copy
          </Button>
          <Button
            className={`bg-inherit border-1 w-full hover:bg-main-orange h-10 mt-auto
            hover:text-white rounded transition-all duration-300
            hover:cursor-pointer  `}
            onClick={(e) => onClick(e, !isCopy)}
          >
            Select
          </Button>
        </div>
      )}
    </li>
  );
};
const ProgramEdit = ({
  item,
  handleWorkouts,
}: Partial<WorkoutPreviewProps>) => {
  const workout = workoutUtils.dtoToEditDto(item!);
  return (
    <li
      key={workout!.id!}
      className="border text-center w-20 lg:w-full grid
                 justify-items-center gap-1 p-1 rounded"
    >
      <h5 className="font-medium">{workout!.name}</h5>
      <div>
        <GenericModel
          Model={ProgramWorkoutEdit}
          modelProps={{ handleWorkouts, workout }}
          mode="create"
          buttonProps={{ buttonStyle: "model", className: "mr-auto" }}
          isOverlay={false}
        />
      </div>
    </li>
  );
};

const ProgramWorkoutSelected = ({
  item,
  handleWorkouts,
}: Partial<WorkoutPreviewProps>) => {
  const workout = workoutUtils.dtoToEditDto(item!);
  return (
    <li
      key={workout!.id!}
      className="border text-center w-20 lg:w-full grid
                 justify-items-center gap-1 p-1 rounded"
    >
      <h5 className="font-medium">{workout!.name}</h5>
      <div>
        <GenericModel
          Model={ProgramWorkoutEdit}
          modelProps={{ handleWorkouts, workout }}
          mode="create"
          buttonProps={{ buttonStyle: "model", className: "mr-auto" }}
          isOverlay={false}
        />
      </div>
    </li>
  );
};
