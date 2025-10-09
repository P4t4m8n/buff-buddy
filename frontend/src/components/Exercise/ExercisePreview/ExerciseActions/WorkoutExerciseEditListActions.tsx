//Components
import ExerciseDetails from "../../ExerciseDetails";
//UI
import Button from "../../../UI/Button";
import GenericModel from "../../../UI/GenericModel";
//Types
import type { IExercisePreviewProps } from "../../../../models/exercise.model";

export default function WorkoutExerciseEditListActions({
  selectExercise,
  item,
}: Partial<IExercisePreviewProps>) {
  if (!selectExercise) return null;

  return (
    <div className="flex justify-between gap-2">
      <GenericModel
        Model={ExerciseDetails}
        modelProps={{ exerciseId: item?.id }}
        mode="details"
        buttonProps={{ buttonStyle: "model" }}
      />
      <Button buttonStyle="save" onClick={() => selectExercise(item)}>
        Select
      </Button>
    </div>
  );
}
