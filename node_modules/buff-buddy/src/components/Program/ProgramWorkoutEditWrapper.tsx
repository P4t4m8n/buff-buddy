import type { IWorkoutDTO } from "../../models/workout.model";
import WorkoutEdit from "../Workout/Edit/WorkoutEdit";

interface ProgramWorkoutEditWrapperProps {
  data?: IWorkoutDTO;
  modelRef: React.RefObject<HTMLDivElement | null>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleModel: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function ProgramWorkoutEditWrapper({
  data,
  modelRef,
  setIsOpen,
  handleModel,
}: ProgramWorkoutEditWrapperProps) {
  return (
    <div ref={modelRef} className="fixed inset-0 h-main bg-main-orange w-full z-20">
      <WorkoutEdit
        workout={data}
        setIsOpen={setIsOpen}
        handleModel={handleModel}
      />
    </div>
  );
}
