//Hooks
import { useProgramWorkoutEdit } from "../../../../hooks/features/program/useProgramWorkoutEdit";
//Components
import ProgramWorkoutEditSelected from "./ProgramWorkoutEditSelected";
import ProgramWorkoutEditWorkoutsList from "./ProgramWorkoutEditWorkoutsList";
//Types
import type {
  IProgramWorkoutDTO,
  IProgramWorkoutEditDTO,
} from "../../../../../../shared/models/program.model";
import type { IModelProps } from "../../../../models/UI.model";

interface ProgramWorkoutProps extends IModelProps<HTMLDivElement> {
  programWorkout?: IProgramWorkoutDTO;
  handleProgramWorkouts: (workout: IProgramWorkoutEditDTO) => void;
}

export default function ProgramWorkoutEdit({
  programWorkout,
  handleProgramWorkouts,
  ...props
}: ProgramWorkoutProps) {
  const {
    selectedWorkout,
    onDaysChange,
    onSelectProgramWorkout,
    handleSelectedWorkoutUpdate,
    handleWorkoutPlannerInfo,
  } = useProgramWorkoutEdit(programWorkout);

  const { modelRef, handleModel } = props;

  const saveToProgram = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (selectedWorkout) {
      handleProgramWorkouts(selectedWorkout);
    }
    if (handleModel) {
      handleModel(e);
    }
  };

  return (
    <div
      ref={modelRef}
      className="h-main fixed inset-0 bg-black-900 z-50 flex flex-col gap-4"
    >
      {selectedWorkout ? (
        <ProgramWorkoutEditSelected
          selectedProgramWorkout={selectedWorkout}
          onDaysChange={onDaysChange}
          saveToProgram={saveToProgram}
          onSelectProgramWorkout={onSelectProgramWorkout}
          parentRef={modelRef}
          handleSelectedWorkoutUpdate={handleSelectedWorkoutUpdate}
          handleWorkoutPlannerInfo={handleWorkoutPlannerInfo}
        />
      ) : (
        <ProgramWorkoutEditWorkoutsList
          handleModel={handleModel}
          modelRef={modelRef}
          onSelectProgramWorkout={onSelectProgramWorkout}
        />
      )}
    </div>
  );
}
