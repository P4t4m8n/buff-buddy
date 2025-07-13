import { useRef } from "react";
import type { IWorkoutDTO } from "../../models/workout.model";
import { useModel } from "../../hooks/shared/useModel";
import Button from "../UI/Button";

import WorkoutEdit from "./WorkoutEdit";

interface WorkoutStartModelProps {
  workout: IWorkoutDTO;
}
export default function WorkoutStartModel({ workout }: WorkoutStartModelProps) {
  const modelRef = useRef<HTMLDivElement>(null);
  const [isOpen,setIsOpen , handleModel] = useModel(modelRef);

  return (
    <>
      <Button
        onClick={handleModel}
        className="text-amber ml-auto w-36 hover:text-black"
        buttonStyle="model"
      >
        Start Workout
      </Button>

      {isOpen ? <WorkoutEdit workout={workout} setIsOpen={setIsOpen} /> : null}
    </>
  );
}
