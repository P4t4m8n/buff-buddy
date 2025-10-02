//UI
import Button from "../../UI/Button";
//Types
import type { IExercisePreviewProps } from "../../../models/exercise.model";
import GenericModel from "../../UI/GenericModel";
import ExerciseDetails from "../ExerciseDetails";

export default function ExerciseWorkoutEditActions({
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
