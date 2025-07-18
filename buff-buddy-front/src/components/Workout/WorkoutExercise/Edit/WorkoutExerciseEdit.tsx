import Input from "../../../UI/Form/Input";
import Label from "../../../UI/Form/Label";
import TextArea from "../../../UI/Form/TextArea";
import SelectWithSearch from "../../../UI/Form/SelectWithSearch";
import Button from "../../../UI/Button";
import ExerciseEditModel from "../../../Exercise/ExerciseEditModel";
import { useWorkoutExerciseEdit } from "../../../../hooks/features/program/useWorkoutExerciseEdit";
import type { Dispatch, MouseEvent } from "react";
import WorkoutExerciseCoreSetsEditList from "../Components/WorkoutExerciseCoreSets/WorkoutExerciseCoreSetsEditList";
import Loader from "../../../UI/Loader";
import type { IWorkoutExerciseEditDTO } from "../../../../../../shared/models/workout.model";

interface WorkoutExerciseEditProps {
  workoutExercise?: IWorkoutExerciseEditDTO;
  workoutExerciseLength?: number;
  modelRef?: React.RefObject<HTMLDivElement | null>;
  handleWorkoutExercise: (workoutExercise: IWorkoutExerciseEditDTO) => void;
  setIsOpen?: Dispatch<React.SetStateAction<boolean>>;
}
export default function WorkoutExerciseEdit({
  workoutExercise,
  workoutExerciseLength,
  modelRef,
  setIsOpen,
  handleWorkoutExercise,
}: WorkoutExerciseEditProps) {
  const {
    handleSelectExercise,
    filterExercises,
    handleSets,
    handleInputChange,
    handleSetChange,
    validateWorkoutExercise,
    workoutExerciseErrors,
    coreSetsErrors,
    workoutExerciseToEdit,
    exercises,
    resetWorkoutExerciseToEdit,
  } = useWorkoutExerciseEdit(workoutExercise, workoutExerciseLength);

  const onUpsertWorkoutExercise = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!workoutExerciseToEdit) return;
    const isValid = validateWorkoutExercise(workoutExerciseToEdit);
    if (!isValid) return;

    const peToUpsert: IWorkoutExerciseEditDTO = {
      ...workoutExerciseToEdit,
      crudOperation: !workoutExerciseToEdit?.id?.startsWith("temp")
        ? "update"
        : "create",
    };

    handleWorkoutExercise(peToUpsert);
    resetWorkoutExerciseToEdit();
    setIsOpen!(false);
  };

  const onDeleteWorkoutExercise = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const peToRemove: IWorkoutExerciseEditDTO = {
      ...workoutExerciseToEdit!,
      crudOperation: "delete",
      order: workoutExerciseLength ?? Infinity,
    };
    handleWorkoutExercise(peToRemove);
    setIsOpen!(false);
  };

  if (!workoutExerciseToEdit) return <Loader />;

  const { order, notes, exercise, coreSets } = workoutExerciseToEdit;

  const isExercise = !!exercise?.id;
  return (
    <div
      className={`grid w-[calc(100%-1rem)] max-w-96 grid-cols-1 bg-main-orange 
         rounded max-h-svh items-center justify-items-center gap-4`}
    >
      <div className=" flex flex-col items gap-4 w-full justify-around px-4 pt-4">
        <Input
          name="order"
          type="number"
          defaultValue={
            order && order >= 1 ? order : workoutExerciseLength ?? 1
          }
          divStyle=" grid grid-cols-[auto_auto_1fr] justify-end gap-2 items-center"
          className="border w-[4ch] aspect-square rounded text-center order-2  "
          min={1}
          onChange={handleInputChange}
        >
          <Label labelPosition="input" className="order-1" htmlFor="order">
            Order:
          </Label>
          {workoutExerciseErrors?.order ? (
            <Label htmlFor="order" className="order-3 text-sm text-red-orange">
              {workoutExerciseErrors?.order}
            </Label>
          ) : null}
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
          {workoutExerciseErrors?.notes ? (
            <Label htmlFor="order" className=" text-sm text-red-orange">
              {workoutExerciseErrors?.notes}
            </Label>
          ) : null}
        </TextArea>

        <SelectWithSearch
          options={exercises}
          selectedOptionName={exercise?.name}
          inputName="exercise"
          handleSelect={handleSelectExercise}
          filterOptions={filterExercises}
          parentModelRef={modelRef}
          error={workoutExerciseErrors?.exerciseId}
          SelectedComponent={
            exercise?.id ? exercise?.name : "Select an Exercise"
          }
          SelectItemComponent={({ option }) => (
            <span className="w-full h-full">{option?.name}</span>
          )}
          AddComponent={ExerciseEditModel}
        />
      </div>

      {isExercise ? (
        <WorkoutExerciseCoreSetsEditList
          coreSets={coreSets}
          handleSets={handleSets}
          handleChange={handleSetChange}
          errors={coreSetsErrors}
        />
      ) : null}
      <div className="col-span-full w-full flex justify-between px-4 pb-4">
        <Button
          buttonStyle="warning"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            resetWorkoutExerciseToEdit();
            setIsOpen!(false);
          }}
        >
          Cancel
        </Button>
        <div className="inline-flex gap-2">
          <Button buttonStyle="warning" onClick={onDeleteWorkoutExercise}>
            Delete
          </Button>

          <Button
            type="button"
            buttonStyle="save"
            onClick={onUpsertWorkoutExercise}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
