import { calendarUtil } from "../../../../utils/calendar.util";
import { toTitle } from "../../../../utils/toTitle";

import WorkoutEditModel from "../../../Workout/WorkoutEditModel";
import WorkoutTags from "../../../Workout/WorkoutTags";

import Button from "../../../UI/Button";
import CheckboxMulti from "../../../UI/Form/CheckboxMulti";
import Label from "../../../UI/Form/Label";
import GenericModel from "../../../UI/GenericModel";
import SelectWithSearch from "../../../UI/Form/SelectWithSearch/SelectWithSearch";
import GenericSelectItem from "../../../UI/Form/SelectWithSearch/GenericSelectItem";

import {
  WORKOUT_LEVELS,
  WORKOUT_GOALS,
} from "../../../../../../shared/consts/program.consts";

import type { IProgramWorkoutDTO } from "../../../../../../shared/models/program.model";
import type { IWorkoutDTO } from "../../../../../../shared/models/workout.model";

interface IProgramWorkoutEditSelectedProps {
  selectedProgramWorkout?: IProgramWorkoutDTO | null;
  parentRef?: React.RefObject<HTMLDivElement | null>;
  onDaysChange: (e: React.ChangeEvent) => void;
  saveToProgram: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSelectProgramWorkout: (
    e: React.MouseEvent<HTMLButtonElement>,
    workout?: IWorkoutDTO,
    isCopy?: boolean
  ) => void;
  handleSelectedWorkoutUpdate?: (workout: IWorkoutDTO | null) => void;
  handleWorkoutPlannerInfo: (
    option: string,
    inputName?: "level" | "workoutGoal"
  ) => void;
}
export default function ProgramWorkoutEditSelected({
  selectedProgramWorkout,
  parentRef,
  onDaysChange,
  saveToProgram,
  onSelectProgramWorkout,
  handleSelectedWorkoutUpdate,
  handleWorkoutPlannerInfo,
}: IProgramWorkoutEditSelectedProps) {
  const options = calendarUtil.getShortWeekDays(true);

  const selectedOptions = calendarUtil.fullWeekdaysToShort(
    selectedProgramWorkout?.daysOfWeek
  );

  if (!selectedProgramWorkout) {
    return <p className="text-center">No workout selected</p>;
  }

  const { workout, workoutLevel, workoutGoal } = selectedProgramWorkout;
  return (
    <div className=" flex flex-col gap-4 h-full">
      <div className="p-2 border rounded grid gap-2">
        <h4>{toTitle(workout?.name)}</h4>
        <WorkoutTags workoutExercises={workout?.workoutExercises} />
        <Button
          buttonStyle="save"
          className="w-full"
          onClick={onSelectProgramWorkout}
        >
          Remove
        </Button>
        <GenericModel
          Model={WorkoutEditModel}
          modelProps={{ workout, afterSubmit: handleSelectedWorkoutUpdate }}
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
      <SelectWithSearch
        options={WORKOUT_GOALS}
        handleSelect={handleWorkoutPlannerInfo}
        SelectedComponent={<p>{workoutGoal ?? "Pick a goal"}</p>}
        filterBy={(item) => item}
        SelectItemComponent={(props) => (
          <GenericSelectItem {...props} inputName="workoutGoal" />
        )}
      />
      <SelectWithSearch
        options={WORKOUT_LEVELS}
        handleSelect={handleWorkoutPlannerInfo}
        SelectedComponent={<p>{workoutLevel ?? "Pick a level"}</p>}
        filterBy={(item) => item}
        SelectItemComponent={(props) => (
          <GenericSelectItem {...props} inputName="level" />
        )}
      />
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
