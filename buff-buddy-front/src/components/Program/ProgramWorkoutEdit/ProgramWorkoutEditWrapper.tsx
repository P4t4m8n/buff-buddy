import type { IWorkoutDTO } from "../../../../../shared/models/workout.model";
import type { IModelProps } from "../../UI/GenericModel";
import WorkoutEdit from "../../Workout/Edit/WorkoutEdit";

interface ProgramWorkoutEditWrapperProps extends IModelProps<HTMLDivElement> {
  data?: IWorkoutDTO;
}
export default function ProgramWorkoutEditWrapper({
  data,
  ...props
}: ProgramWorkoutEditWrapperProps) {
  const { modelRef, handleModel, setOpen } = props;
  return (
    <div
      ref={modelRef}
      className="fixed inset-0 h-main bg-main-orange w-full z-20"
    >
      <WorkoutEdit
        workout={data}
        setIsOpen={setOpen}
        handleModel={handleModel}
      />
    </div>
  );
}
