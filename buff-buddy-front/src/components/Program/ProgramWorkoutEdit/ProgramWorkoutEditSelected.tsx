import type { IWorkoutDTO } from "../../../../../shared/models/workout.model";
import { calendarUtil } from "../../../utils/calendar.util";
import Button from "../../UI/Button";
import CheckboxMulti from "../../UI/Form/CheckboxMulti";
import Label from "../../UI/Form/Label";
import DynamicWorkoutPreview from "../../Workout/DynamicWorkoutPreview";

interface IProgramWorkoutEditSelectedProps {
  selectedWorkout?: IWorkoutDTO | null;
  onDaysChange: (e: React.ChangeEvent) => void;
  saveToProgram: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function ProgramWorkoutEditSelected({
  selectedWorkout,
  onDaysChange,
  saveToProgram,
}: IProgramWorkoutEditSelectedProps) {
  const options = calendarUtil.getShortWeekDays(true);
  const selectedOptions =
    calendarUtil.fullWeekdaysToShort(selectedWorkout?.daysOfWeek || []) ?? [];
  return (
    <>
      {" "}
      {selectedWorkout ? (
        <div className="border p-2">
          <DynamicWorkoutPreview workout={selectedWorkout} />
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
      ) : (
        <p className="text-center">No workout selected</p>
      )}
    </>
  );
}
