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
import type { IModelProps } from "../../../../models/model.model";

interface ProgramWorkoutProps extends IModelProps<HTMLDivElement> {
  programWorkout?: IProgramWorkoutDTO|IProgramWorkoutEditDTO;
  handleProgramWorkouts: (workout: IProgramWorkoutEditDTO) => void;
}

export default function ProgramWorkoutEdit({
  programWorkout,
  handleProgramWorkouts,
  ...props
}: ProgramWorkoutProps) {
  const {
    selectedProgramWorkout,
    onDaysChange,
    onSelectProgramWorkout,
    handleSelectedWorkoutUpdate,
    handleWorkoutPlannerInfo,
  } = useProgramWorkoutEdit(programWorkout);

  const { modelRef, handleModel } = props;

  const onSaveToProgram = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (selectedProgramWorkout) {
      handleProgramWorkouts(selectedProgramWorkout);
    }
    if (handleModel) {
      handleModel(e);
    }
  };
  return (
    <div
      ref={modelRef}
      className="h-main fixed inset-0 bg-black-900 z-50  w-full grid grid-rows-[3.5rem_calc(100%-5rem)] gap-6"
    >
      {selectedProgramWorkout ? (
        <ProgramWorkoutEditSelected
          selectedProgramWorkout={selectedProgramWorkout}
          onDaysChange={onDaysChange}
          saveToProgram={onSaveToProgram}
          onSelectProgramWorkout={onSelectProgramWorkout}
          parentRef={modelRef}
          handleSelectedWorkoutUpdate={handleSelectedWorkoutUpdate}
          handleWorkoutPlannerInfo={handleWorkoutPlannerInfo}
          handleModel={handleModel}
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
