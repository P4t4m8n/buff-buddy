import { Link } from "react-router";
import type { IWorkoutDTO } from "../../../../shared/models/workout.model";
import Button from "../UI/Button";
import WorkoutTags from "./WorkoutTags";
import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";
import GenericDeleteButton from "../UI/GenericDeleteButton";
import { useWorkoutStore } from "../../store/workout.store";
type TActionRoute = "programEdit" | "workoutList";

interface IWorkoutPreviewProps {
  item: IWorkoutDTO;
  actionType?: TActionRoute | string; //INFO to lazy to import the type
  onSelectProgramWorkout?: (
    e: React.MouseEvent<HTMLButtonElement>,
    workout?: IWorkoutDTO,
    isCopy?: boolean
  ) => void;
  onDeleteWorkout?: (id?: string) => Promise<void>;
}
export default function WorkoutPreview({
  item: workout,
  ...props
}: IWorkoutPreviewProps) {
  const { name, workoutExercises } = workout;
  console.log("render");

  return (
    <li className="p-2 border rounded grid gap-2">
      <h4>{name}</h4>

      <WorkoutTags workoutExercises={workoutExercises} />

      <DynamicAction {...props} item={workout} />
    </li>
  );
}

const DynamicAction = (props: IWorkoutPreviewProps) => {
  const { actionType } = props;

  switch (actionType) {
    case "programEdit":
      return <ProgramEditActions {...props} />;
    case "workoutList":
      return <WorkoutDetailsActions {...props} />;
    default:
      return null;
  }
};

const ProgramEditActions = (props: Partial<IWorkoutPreviewProps>) => {
  const { onSelectProgramWorkout, item } = props;
  const isCopy = true;

  if (!onSelectProgramWorkout) return null;

  return (
    <div className="flex gap-2">
      <Button
        buttonStyle="save"
        onClick={(e) => onSelectProgramWorkout(e, item, isCopy)}
      >
        Copy
      </Button>
      <Button
        buttonStyle="save"
        onClick={(e) => onSelectProgramWorkout(e, item, !isCopy)}
      >
        Select
      </Button>
    </div>
  );
};

const WorkoutDetailsActions = (props: Partial<IWorkoutPreviewProps>) => {
  const { item: workout, onDeleteWorkout } = props;
  const workoutId = workout?.id;
  return (
    <div className=" flex items-center gap-3 ">
      <Link to={`/workouts/${workoutId}`} className="mr-auto">
        <Button buttonStyle="model">{ModelButtonIcon("details")}</Button>
      </Link>
      <Link to={`/workouts/edit/${workoutId}`} className="">
        <Button buttonStyle="model">{ModelButtonIcon("edit")}</Button>
      </Link>
      <GenericDeleteButton
        itemId={workoutId}
        useStore={useWorkoutStore}
        deleteAction={onDeleteWorkout!}
      />
    </div>
  );
};
