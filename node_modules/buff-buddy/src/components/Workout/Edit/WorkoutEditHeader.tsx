import type { ChangeEvent, MouseEvent } from "react";
import type { TDayOfWeek } from "../../../models/UI.model";
import { calendarUtil } from "../../../utils/calendar.util";
import CheckboxMulti from "../../UI/Form/CheckboxMulti";
import Input from "../../UI/Form/Input";
import Label from "../../UI/Form/Label";
import TextArea from "../../UI/Form/TextArea";
import WorkoutExerciseEditModel from "../WorkoutExercise/Edit/WorkoutExerciseEditModel";
import Button from "../../UI/Button";
import type { IWorkoutExerciseEditDTO } from "../../../models/workout.model";

interface WorkoutEditHeaderProps {
  name?: string;
  notes?: string;
  daysOfWeek?: TDayOfWeek[];
  isProgramEdit?: boolean;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onDaysChange: (e: ChangeEvent) => void;
  handleWorkoutExercises: (workoutExercise: IWorkoutExerciseEditDTO) => void;
  onCancel: (e: MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
  workoutExerciseLength: number;
}
export default function WorkoutEditHeader({
  name,
  notes,
  daysOfWeek,
  isProgramEdit,
  handleInputChange,
  onDaysChange,
  handleWorkoutExercises,
  onCancel,
  isLoading,
  workoutExerciseLength,
}: WorkoutEditHeaderProps) {
  return (
    <header className="grid gap-2">
      <h3 className="text-center text-2xl">Create Workout</h3>
      <Input
        value={name || ""}
        type="text"
        name="name"
        id="name"
        placeholder=""
        onChange={handleInputChange}
        className={`w-full h-10 peer outline-offset-0 pl-2 border-1 rounded
                
              `}
        divStyle="bg-main-orange h-fit"
      >
        <Label isMoveUpEffect={true} labelPosition="input" htmlFor="name">
          Workout Name
        </Label>
        {/* <Label
                isMoveUpEffect={true}
                htmlFor="name"
                className={`${
                  error?.errors?.name
                    ? " text-sm w-fit text-red-orange peer-[:not(:placeholder-shown)]:text-red-orange peer-focus:text-red-orange"
                    : ""
                }`}
              >
                {error?.errors?.name ? " Program name is required" : "Program Name"}
              </Label> */}
      </Input>
      <TextArea
        defaultValue={notes}
        name="notes"
        rows={3}
        placeholder=""
        className="w-full h-20 block peer outline-offset-0 p-2 resize-none border-1 rounded "
        divStyle="bg-main-orange  h-auto col-span-full relative group "
        onChange={handleInputChange}
      >
        <Label labelPosition="textArea" isMoveUpEffect={true} htmlFor="note">
          Notes
        </Label>
        {/* {errors?.notes ? (
                <Label htmlFor="order" className=" text-sm text-red-orange">
                  {errors?.notes}
                </Label>
              ) : null} */}
      </TextArea>
      {isProgramEdit ? (
        <div className="grid content-around h-28">
          <Label htmlFor="daysOfWeek">Days of the week</Label>
          <CheckboxMulti
            options={calendarUtil.getShortWeekDays(true)}
            selectedOptions={
              calendarUtil.fullWeekdaysToShort(daysOfWeek || []) ?? []
            }
            inputName="daysOfWeek"
            listStyle="border rounded p-1 gap-2 w-full grid grid-cols-4 justify-center justify-items-center h-20"
            onChange={onDaysChange}
          />
          {/* {programExerciseErrors?.daysOfWeek ? (
              <Label htmlFor="order" className=" text-sm text-red-orange">
                {programExerciseErrors?.daysOfWeek}
              </Label>
            ) : null} */}
        </div>
      ) : null}
      <div className="flex w-full h-10">
        <WorkoutExerciseEditModel
          workoutExerciseLength={workoutExerciseLength}
          handleWorkoutExercise={handleWorkoutExercises}
        />
        <div className="inline-flex items-center gap-2 ml-auto">
          <Button
            className="w-16 border rounded lg:w-full hover:border-red-orange
                         cursor-pointer h-10
                         hover:text-red-orange transition-all duration-300"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            aria-disabled={isLoading}
            className={`bg-inherit border-1 w-16 lg:w-full hover:bg-main-orange h-10
                           hover:text-white rounded transition-all duration-300
                           hover:cursor-pointer ${
                             isLoading ? "opacity-50" : ""
                           } `}
          >
            Save
          </Button>
        </div>
      </div>
    </header>
  );
}
