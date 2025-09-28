import { Link } from "react-router";

import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";

import WorkoutTags from "./WorkoutTags";

import Button from "../UI/Button";
import GenericDeleteButton from "../UI/GenericDeleteButton";

import type { IWorkoutDTO } from "../../../../shared/models/workout.model";
import type { TWorkoutActionRoute } from "../../models/workout.model";
import GenericCarousel from "../UI/GenericCarousel";

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

  return (
    <li className="p-2 border rounded grid gap-2 break-inside-avoid mb-4 w-full ">
      <h4>{name}</h4>

      {/* <WorkoutTags workoutExercises={workoutExercises} /> */}
      <GenericCarousel
        items={exerciseNames}
        props={{}}
        ItemComponent={WorkoutTag}
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
  const { isTemplate } = item ?? {};

  if (!onSelectProgramWorkout) return null;

  return (
    <div className="flex gap-2">
      <Button
        buttonStyle="save"
        onClick={(e) => onSelectProgramWorkout(e, item, isCopy)}
      >
        Copy
      </Button>
      {isTemplate ? null : (
        <Button
          buttonStyle="save"
          onClick={(e) => onSelectProgramWorkout(e, item, !isCopy)}
        >
          Select
        </Button>
      )}
    </div>
  );
};

const WorkoutDetailsActions = (props: Partial<IWorkoutPreviewProps>) => {
  const { item: workout, onDeleteWorkout, isDeleting } = props;
  const workoutId = workout?.id;

  return (
    <div className="flex items-center gap-3">
      <Link to={`/workouts/${workoutId}`} className="mr-auto">
        <Button buttonStyle="model">{ModelButtonIcon("details")}</Button>
      </Link>
      <Link to={`/workouts/edit/${workoutId}`} className="">
        <Button buttonStyle="model">{ModelButtonIcon("edit")}</Button>
      </Link>
      <GenericDeleteButton
        itemId={workoutId ?? ""}
        isDeleting={!!isDeleting}
        deleteAction={onDeleteWorkout!}
      />
    </div>
  );
};

function WorkoutTag({ item }: { item?: string }) {
  return (
    <li
      className="border rounded-4xl px-2 py-1 min-w-fit shadow
       bg-main-black text-main-orange shadow-black"
      key={item}
    >
      {item}
    </li>
  );
}
