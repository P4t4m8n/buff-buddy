import Button from "../UI/Button";

import type { IModelProps } from "../../models/model.model";

interface IWorkoutStartExerciseSkipDetailsModelProps
  extends IModelProps<HTMLDivElement> {
  lastSkippedReason?: string | null;
}
export default function WorkoutStartExerciseSkipDetailsModel({
  lastSkippedReason,
  ...modelProps
}: IWorkoutStartExerciseSkipDetailsModelProps) {
  const { modelRef, handleModel } = modelProps;
  return (
    <div ref={modelRef} className="p-4 bg-black-500 border rounded grid  gap-4">
      <h5 className="text-center text-xl">Skipped Set Reason:</h5>
      <p className="text-center p-2">{lastSkippedReason}</p>
      <Button
        buttonStyle="save"
        className=" place-self-center"
        type="button"
        onClick={handleModel}
      >
        Close
      </Button>
    </div>
  );
}
