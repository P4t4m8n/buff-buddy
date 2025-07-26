import { useRef } from "react";
import Button from "../../../UI/Button";
import { useModel } from "../../../../hooks/shared/useModel";
import { ModelButtonIcon } from "../../../../utils/ModelButtonIcon.util";
import ModelOverlay from "../../../UI/ModelOverlay";
import WorkoutExerciseEdit from "./WorkoutExerciseEdit";
import type { IWorkoutExerciseEditDTO } from "../../../../../../shared/models/workout.model";

interface WorkoutExerciseEditModelProps {
  workoutExercise?: IWorkoutExerciseEditDTO;
  workoutExerciseLength?: number;
  handleWorkoutExercise: (workoutExercise: IWorkoutExerciseEditDTO) => void;
}

export default function WorkoutExerciseEditModel({
  workoutExercise,
  workoutExerciseLength,
  handleWorkoutExercise,
}: WorkoutExerciseEditModelProps) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen, handleModel] = useModel(modelRef);

  const mode = workoutExercise?.id ? "edit" : "create";
  return (
    <>
      <Button
        onClick={handleModel}
        className={`${
          mode === "create" ? "mr-auto" : " mr-0 mt-auto w-fit"
        } lg:mr-0 lg:w-full`}
        buttonStyle="model"
      >
        {ModelButtonIcon(mode)}
      </Button>
      {isOpen ? (
        <ModelOverlay isOpen={isOpen}>
          <WorkoutExerciseEdit
            workoutExercise={workoutExercise}
            workoutExerciseLength={workoutExerciseLength}
            handleWorkoutExercise={handleWorkoutExercise}
            modelRef={modelRef}
            setIsOpen={setIsOpen}
          />
        </ModelOverlay>
      ) : null}
    </>
  );
}
