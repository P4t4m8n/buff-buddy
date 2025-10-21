//Utils
import { calendarUtil } from "../../../../utils/calendar.util";
import toTitle  from "../../../../utils/toTitle";
import { getTempId } from "../../../../../../shared/utils/getTempId";
//Components
import WorkoutEditModel from "../../../Workout/WorkoutEditModel";
//UI
import Button from "../../../UI/Button";
import CheckboxMulti from "../../../UI/Form/CheckboxMulti";
import Label from "../../../UI/Form/Label";
import GenericModel from "../../../UI/GenericModel";
import SelectWithSearch from "../../../UI/Form/SelectWithSearch/SelectWithSearch";
import GenericSelectItem from "../../../UI/Form/SelectWithSearch/GenericSelectItem";
import PageHeader from "../../../UI/PageHeader";
import GenericCarousel from "../../../UI/GenericCarousel";
import GenericSaveButton from "../../../UI/GenericSaveButton";
import Tag from "../../../UI/Tag";
//Consts
import {
  WORKOUT_LEVELS,
  WORKOUT_GOALS,
} from "../../../../../../shared/consts/program.consts";
//Types
import type { IProgramWorkoutEditDTO } from "../../../../../../shared/models/program.model";
import type { IWorkoutDTO } from "../../../../../../shared/models/workout.model";
import type { IWorkoutEditModelProps } from "../../../../models/model.model";

interface IProgramWorkoutEditSelectedProps {
  selectedProgramWorkout?: IProgramWorkoutEditDTO | null;
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
    inputName?: "workoutLevel" | "workoutGoal"
  ) => void;
  handleModel?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export default function ProgramWorkoutEditSelected({
  selectedProgramWorkout,
  parentRef,
  onDaysChange,
  saveToProgram,
  onSelectProgramWorkout,
  handleSelectedWorkoutUpdate,
  handleWorkoutPlannerInfo,
  handleModel,
}: IProgramWorkoutEditSelectedProps) {
  const options = calendarUtil.getShortWeekDays(true);

  const selectedOptions = calendarUtil.fullWeekdaysToShort(
    selectedProgramWorkout?.daysOfWeek
  );

  if (!selectedProgramWorkout) {
    return <p className="text-center">No workout selected</p>;
  }

  const { workout, workoutLevel, workoutGoal } = selectedProgramWorkout;
  const { id: tempWorkoutId, sourceWorkoutId } = workout || {};
  const workoutId =
    tempWorkoutId && !tempWorkoutId.startsWith("temp")
      ? tempWorkoutId
      : sourceWorkoutId || undefined;

  //Info:TS is a  annoying here because workoutExercises can be undefined
  const exerciseNames = workout?.workoutExercises
    ?.map((we) => we.exercise?.name)
    .filter((name): name is string => !!name);
  return (
    <>
      <PageHeader handleModel={handleModel} pageName="program workout" />
      <div className="flex flex-col px-4 gap-4 pb-4">
        <h4 className="text-xl underline ">{toTitle(workout?.name)} Workout</h4>
        <div className="col-span-full h-fit">
          <GenericCarousel
            items={exerciseNames}
            props={{}}
            ItemComponent={Tag}
            getKey={(item) => item || getTempId()}
            listName="exercises"
          />
        </div>

        <Label htmlFor="daysOfWeek">Days of the week</Label>

        <CheckboxMulti
          options={options}
          selectedOptions={selectedOptions}
          inputName="daysOfWeek"
          listStyle="border rounded p-1 gap-2 w-full grid grid-cols-4 justify-center justify-items-center h-20"
          onChange={onDaysChange}
        />

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
            <GenericSelectItem {...props} inputName="workoutLevel" />
          )}
        />

        <div className="grid grid-cols-2 grid-rows-2 gap-x-8 gap-y-2 mt-auto">
          <Button
            buttonStyle="save"
            className="w-full"
            onClick={onSelectProgramWorkout}
          >
            Replace
          </Button>

          <GenericModel<HTMLDivElement, IWorkoutEditModelProps>
            Model={WorkoutEditModel}
            modelProps={{
              workoutId,
              afterSubmit: handleSelectedWorkoutUpdate,
              isCopy: true,
            }}
            mode="edit"
            buttonProps={{ buttonStyle: "model" }}
            isPortal={true}
            parentRef={parentRef}
          />

          <GenericSaveButton
            isSaving={false}
            type="button"
            saveAction={saveToProgram}
            style=" col-span-2"
          />
        </div>
      </div>
    </>
  );
}
