//Components
import ExerciseDetails from "../../ExerciseDetails";
//UI
import Button from "../../../UI/Button";
import GenericModel from "../../../UI/GenericModel";
//Types
import type { IExercisePreviewProps } from "../../../../models/exercise.model";

export default function WorkoutExerciseSelectedActions({
  selectExercise,
  item,
}: Partial<IExercisePreviewProps>) {
  const onClick = () => {
    if (!selectExercise) {
      console.warn("NO select exercise function - this should NOT happen");
      return;
    }
    selectExercise(null);
    return;
  };

  return (
    <div className="flex justify-between gap-2">
      <Button className="border rounded px-2" onClick={onClick}>
        Replace
      </Button>
      <GenericModel
        Model={ExerciseDetails}
        modelProps={{ exerciseId: item?.id }}
        mode="details"
        buttonProps={{ buttonStyle: "model" }}
      />
    </div>
  );
}
