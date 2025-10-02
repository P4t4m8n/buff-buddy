//Utils
import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";
//UI
import Button from "../UI/Button";
import GenericDeleteButton from "../UI/GenericDeleteButton";
import Tag from "../UI/Tag";
import GenericCarousel from "../UI/GenericCarousel";
import LinkComponent from "../UI/Link";
//Types
import type { IWorkoutDTO } from "../../../../shared/models/workout.model";
import type { TWorkoutActionRoute } from "../../models/workout.model";
import { toTitle } from "../../utils/toTitle";

interface IWorkoutPreviewProps {
  item: IWorkoutDTO;
  actionType?: TWorkoutActionRoute;
  onSelectProgramWorkout?: (
    e: React.MouseEvent<HTMLButtonElement>,
    workout?: IWorkoutDTO,
    isCopy?: boolean
  ) => void;
  onDeleteWorkout?: (id?: string) => Promise<void>;
  isDeleting?: boolean;
}
export default function WorkoutPreview({
  item: workout,
  ...props
}: IWorkoutPreviewProps) {
  const { name, workoutExercises } = workout;

  const exerciseNames =
    workoutExercises
      ?.map((we) => we.exercise?.name)
      .filter((name): name is string => !!name) ?? [];

  //info: demo data is broken and im lazy, so just using a set to filter out duplicates
  const exerciseSet = new Set(exerciseNames).values();

  return (
    <li className="p-2 border rounded grid gap-2 break-inside-avoid mb-4 w-full ">
      <h4>{toTitle(name)}</h4>

      <GenericCarousel
        items={exerciseSet ? Array.from(exerciseSet) : []}
        props={{}}
        ItemComponent={Tag}
        getKey={(item) => item}
      />

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
        Select
      </Button>
    </div>
  );
};

const WorkoutDetailsActions = (props: Partial<IWorkoutPreviewProps>) => {
  const { item: workout, onDeleteWorkout, isDeleting } = props;
  const workoutId = workout?.id;

  return (
    <div className="flex items-center gap-3">
      <LinkComponent to={`/workouts/${workoutId}`} className="mr-auto">
        <Button buttonStyle="model">{ModelButtonIcon("details")}</Button>
      </LinkComponent>
      <LinkComponent to={`/workouts/edit/${workoutId}`} className="">
        <Button buttonStyle="model">{ModelButtonIcon("edit")}</Button>
      </LinkComponent>
      <GenericDeleteButton
        itemId={workoutId ?? ""}
        isDeleting={!!isDeleting}
        deleteAction={onDeleteWorkout!}
      />
    </div>
  );
};
