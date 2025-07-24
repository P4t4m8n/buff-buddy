import type { IProgramWorkoutDTO } from "../../../../../shared/models/program.model";
import { calendarUtil } from "../../../utils/calendar.util";
import Button from "../../UI/Button";
import CheckboxMulti from "../../UI/Form/CheckboxMulti";
import Label from "../../UI/Form/Label";
import GenericModel from "../../UI/GenericModel";
import WorkoutEdit from "../../Workout/Edit/WorkoutEdit";

import WorkoutTags from "../../Workout/WorkoutTags";

interface IProgramWorkoutEditSelectedProps {
  selectedProgramWorkout?: IProgramWorkoutDTO | null;
  onDaysChange: (e: React.ChangeEvent) => void;
  saveToProgram: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSelectProgramWorkout: (
    workout?: IProgramWorkoutDTO,
    isCopy?: boolean
  ) => void;
  parentRef?: React.RefObject<HTMLDivElement | null>;
}
export default function ProgramWorkoutEditSelected({
  selectedProgramWorkout,
  onDaysChange,
  saveToProgram,
  onSelectProgramWorkout,
  parentRef,
}: IProgramWorkoutEditSelectedProps) {
  const options = calendarUtil.getShortWeekDays(true);
  const selectedOptions =
  calendarUtil.fullWeekdaysToShort(
    selectedProgramWorkout?.daysOfWeek || []
  ) ?? [];
  
  if (!selectedProgramWorkout) {
    return <p className="text-center">No workout selected</p>;
  }
  
  console.log("🚀 ~ ProgramWorkoutEditSelected ~ selectedProgramWorkout:", selectedProgramWorkout)
  const { workout } = selectedProgramWorkout;
  return (
    <div className="border p-2">
      <div className="p-2 border rounded grid gap-2">
        <WorkoutTags workout={workout} />
        <Button
          buttonStyle="save"
          className="w-full"
          onClick={() => onSelectProgramWorkout()}
        >
          Cancel
        </Button>
        <GenericModel
          Model={WorkoutEdit}
          modelProps={{ workout: selectedProgramWorkout }}
          mode="edit"
          buttonProps={{ buttonStyle: "model" }}
          isPortal={true}
          parentRef={parentRef}
        />
      </div>
      <div className="grid content-around h-28">
        <Label htmlFor="daysOfWeek">Days of the week</Label>
        <CheckboxMulti
          options={options}
          selectedOptions={selectedOptions}
          inputName="daysOfWeek"
          listStyle="border rounded p-1 gap-2 w-full grid grid-cols-4 justify-center justify-items-center h-20"
          onChange={onDaysChange}
        />
      </div>
      <Button
        className={`bg-inherit border-1 w-full hover:bg-main-orange h-10 min-h-10 mt-auto
                  hover:text-white rounded transition-all duration-300
                  hover:cursor-pointer  `}
        onClick={saveToProgram}
      >
        Save to Program
      </Button>
    </div>
  );
}
