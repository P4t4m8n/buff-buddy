//Components
import WorkoutExerciseEditListActions from "./ExerciseActions/WorkoutExerciseEditListActions";
import ExerciseListActions from "./ExerciseActions/ExerciseListActions";
import WorkoutExerciseSelectedActions from "./ExerciseActions/WorkoutExerciseSelectedActions";
//Utils
import toTitle from "../../../utils/toTitle";
//UI
import GenericCarousel from "../../UI/GenericCarousel";
import Tag from "../../UI/Tag";
//Types
import type { IExercisePreviewProps } from "../../../models/exercise.model";

export default function ExercisePreview(props: IExercisePreviewProps) {
  const { muscles, id, name, equipment, isCompounded } = props.item;

  const musclesName = muscles?.map((muscle) => muscle.name);
  const equipmentName = equipment?.map((equip) => equip.name);

  const compoundText = isCompounded ? " Compound" : "Isolation";

  return (
    <li key={id} className="shadow-border rounded p-2 flex flex-col gap-4 ">
      <span className="inline-flex justify-between">
        <h3 className=" truncate text-ellipsis underline ">{toTitle(name)}</h3>
        <p>{compoundText}</p>
      </span>

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
      return <WorkoutExerciseSelectedActions {...props} />;
    case "exerciseList":
      return <ExerciseListActions {...props} />;
    case "workoutExerciseEditList":
      return <WorkoutExerciseEditListActions {...props} />;
    default:
      return null;
  }
};
