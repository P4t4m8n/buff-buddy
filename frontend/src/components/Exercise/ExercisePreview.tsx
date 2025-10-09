//
//Utils
import { toTitle } from "../../utils/toTitle";
//UI
import GenericCarousel from "../UI/GenericCarousel";
import Tag from "../UI/Tag";
//Types
import type { IExercisePreviewProps } from "../../models/exercise.model";
import ExerciseWorkoutEditActions from "./ExerciseActions/ExerciseWorkoutEditActions";
import ExerciseListActions from "./ExerciseActions/ExerciseListActions";

export default function ExercisePreview(props: IExercisePreviewProps) {
  const { muscles, id, name, equipment } = props.item;

  const musclesName =  muscles?.map((muscle) => muscle.name);
  const equipmentName = equipment?.map((equip) => equip.name);

  return (
    <li key={id} className="shadow-border rounded p-2 flex flex-col gap-4 ">
      <h3 className=" truncate text-ellipsis underline ">{toTitle(name)}</h3>
      <GenericCarousel
      listName="Muscles used"
        items={musclesName ?? []}
        props={{}}
        ItemComponent={Tag}
        getKey={(item) => item}
      />
      <GenericCarousel
      listName="Equipment"
        items={equipmentName ?? []}
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
      return <ExerciseWorkoutEditActions {...props} />;
    case "exerciseList":
      return <ExerciseListActions {...props} />;
    default:
      return null;
  }
};
