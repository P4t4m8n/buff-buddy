import { useRef } from "react";
import Button from "../UI/Button";
import { useModel } from "../../hooks/shared/useModel";
import ProgramWorkoutEdit from "./ProgramWorkoutEdit";
import type { IWorkoutDTO, IWorkoutEditDTO } from "../../models/workout.model";
interface ProgramEditWorkoutModelProps {
  workout?: IWorkoutDTO | IWorkoutEditDTO;
  handleWorkouts?: (workout: IWorkoutEditDTO) => void;
}

export default function ProgramEditWorkoutModel({
  workout,
  handleWorkouts,
}: ProgramEditWorkoutModelProps) {
  const modelRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, , handleModel] = useModel(modelRef);

  return (
    <>
      <Button
        onClick={handleModel}
        className="w-32  border rounded lg:w-full hover:bg-main-black
            cursor-pointer h-10 mr-auto
            hover:text-main-orange transition-all duration-300"
        buttonStyle={null}
      >
        Add Workout
      </Button>
      {isOpen ? (
        <ProgramWorkoutEdit
          handleWorkouts={handleWorkouts}
          workout={workout}
          parentRef={modelRef}
          handleModel={handleModel}
        ></ProgramWorkoutEdit>
      ) : null}
    </>
  );
}
