//Lib
import { useContext } from "react";
//Utils
import { toTitle } from "../../utils/toTitle";
//Context
import { IsDeletingContext } from "../../hooks/context/IsDeletingContext";
//UI
import GenericDeleteButton from "../UI/GenericDeleteButton";
import LinkComponent from "../UI/Link";
import GenericCarousel from "../UI/GenericCarousel";
import Tag from "../UI/Tag";
import Button from "../UI/Button";
//Types
import type { IExerciseDTO } from "../../../../shared/models/exercise.model";
import type { TExerciseActionRoute } from "../../models/exercise.model";
interface IExercisePreviewProps {
  item: IExerciseDTO;
  actionType?: TExerciseActionRoute;
  deleteItem: (id?: string) => Promise<void>;
  selectExercise?: (exercise?: IExerciseDTO) => void;
}
export default function ExercisePreview(props: IExercisePreviewProps) {
  const { muscles, id, name, equipment } = props.item;

  return (
    <li
      key={id}
      className="border rounded p-2 shadow 
       flex flex-col gap-2 h-full justify-between "
    >
      <h3 className=" truncate underline">{toTitle(name)}</h3>
      <GenericCarousel
        items={muscles ?? []}
        props={{}}
        ItemComponent={Tag}
        getKey={(item) => item}
      />
      <GenericCarousel
        items={equipment ?? []}
        props={{}}
        ItemComponent={Tag}
        getKey={(item) => item}
      />
      <DynamicAction {...props} />
    </li>
  );
}

const DynamicAction = (props: IExercisePreviewProps) => {
  const { actionType } = props;

  switch (actionType) {
    case "workoutEdit":
      return <WorkoutEditActions {...props} />;
    case "exerciseList":
      return <ExerciseListActions {...props} />;
    default:
      return null;
  }
};

const WorkoutEditActions = (props: Partial<IExercisePreviewProps>) => {
  const { selectExercise, item } = props;

  if (!selectExercise) return null;

  return (
    <div className="flex gap-2">
      <Button buttonStyle="save" onClick={() => selectExercise(item)}>
        Select
      </Button>
    </div>
  );
};

const ExerciseListActions = (props: Partial<IExercisePreviewProps>) => {
  const { item: exercise, deleteItem } = props;

  if (!deleteItem) return null;
  const exerciseId = exercise?.id;
  const isDeleting = useContext(IsDeletingContext);

  return (
    <nav className="flex gap-3 ">
      <LinkComponent
        to={`/exercises/${exerciseId}`}
        mode="details"
        linkStyle="model"
        className="w-fit mr-auto"
      />

      <LinkComponent
        to={`/exercises/edit/${exerciseId}`}
        mode="edit"
        linkStyle="model"
        className="w-fit"
      />
      <GenericDeleteButton
        itemId={exerciseId!}
        isDeleting={!!isDeleting}
        deleteAction={deleteItem}
      />
    </nav>
  );
};
