import { useRef } from "react";
import { useModel } from "../../../../hooks/shared/useModel";
import Button from "../../../UI/Button";
import { ModelButtonIcon } from "../../../../utils/ModelButtonIcon.util";
import ModelOverlay from "../../../UI/ModelOverlay";
import type { IWorkoutExerciseDTO } from "../../../../../../shared/models/workout.model";

interface WorkoutExerciseDetailsProps {
  workoutExercise: IWorkoutExerciseDTO;
}
export default function WorkoutExerciseDetails({
  workoutExercise,
}: WorkoutExerciseDetailsProps) {
  console.log("🚀 ~ workoutExercise:", workoutExercise);
  const modelRef = useRef<HTMLDivElement>(null);
  const [isOpen, , handleModel] = useModel(modelRef);
  const buttonMode = "details";
  return (
    <>
      <Button
        onClick={handleModel}
        className={`lg:mr-0 lg:w-full`}
        buttonStyle="model"
      >
        {ModelButtonIcon(buttonMode)}
      </Button>
      {isOpen ? (
        <ModelOverlay isOpen={isOpen}>
          <div
            className={`grid w-[calc(100%-1rem)] max-w-96 grid-cols-1 bg-main-orange 
         rounded max-h-svh items-center justify-items-center gap-4`}
          ></div>
        </ModelOverlay>
      ) : null}
    </>
  );
}
