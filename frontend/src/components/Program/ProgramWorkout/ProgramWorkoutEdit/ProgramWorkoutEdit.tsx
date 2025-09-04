import { useProgramWorkoutEdit } from "../../../../hooks/features/program/useProgramWorkoutEdit";

import WorkoutEditModel from "../../../Workout/WorkoutEditModel";
import ProgramWorkoutEditSelected from "./ProgramWorkoutEditSelected";
import ProgramWorkoutList from "./ProgramWorkoutList";

import Button from "../../../UI/Button";
import GenericModel from "../../../UI/GenericModel";

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
      className="h-main fixed inset-0 bg-black-500 p-2 z-10 flex flex-col gap-4"
    >
      <header className={""}>
        <h3 className="text-center">Pick a workout</h3>
        <ProgramWorkoutEditSelected
          selectedProgramWorkout={selectedWorkout}
          onDaysChange={onDaysChange}
          saveToProgram={saveToProgram}
          onSelectProgramWorkout={onSelectProgramWorkout}
          parentRef={modelRef}
          handleSelectedWorkoutUpdate={handleSelectedWorkoutUpdate}
        />
      </header>

      <GenericModel
        Model={WorkoutEditModel}
        mode="create"
        buttonProps={{ buttonStyle: "model" }}
        isOverlay={false}
        isPortal={true}
        parentRef={modelRef}
      />

      <ProgramWorkoutList
        selectedWorkout={selectedWorkout}
        onSelectProgramWorkout={onSelectProgramWorkout}
      />

      <Button
        onClick={handleModel}
        className={`bg-inherit border-1 w-full hover:bg-main-orange h-10 min-h-10 mt-auto
              hover:text-white rounded transition-all duration-300
              hover:cursor-pointer  `}
      >
        Cancel
      </Button>
    </div>
  );
}
