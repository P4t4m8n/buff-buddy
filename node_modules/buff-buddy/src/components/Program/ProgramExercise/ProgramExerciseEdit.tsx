import { calendarUtil } from "../../../utils/calendar.util";
import { useProgramExerciseEdit } from "../../../hooks/features/program/useProgramExerciseEdit";
import Input from "../../UI/Form/Input";
import Label from "../../UI/Form/Label";
import TextArea from "../../UI/Form/TextArea";
import CheckboxMulti from "../../UI/Form/CheckboxMulti";
import SelectWithSearch from "../../UI/Form/SelectWithSearch";
import ProgramExerciseCoreSetsEditList from "./ProgramExerciseCoreSetsEditList";
import Button from "../../UI/Button";
import type { Dispatch, MouseEvent } from "react";
import type { IProgramExerciseEditDTO } from "../../../models/programExercise.model";
import ExerciseEditModel from "../../Exercise/ExerciseEditModel";

interface ProgramExerciseEditProps {
  programExercise?: IProgramExerciseEditDTO;
  programExerciseLength?: number;
  modelRef?: React.RefObject<HTMLDivElement | null>;
  handleProgramExercise: (programExercise: IProgramExerciseEditDTO) => void;
  setIsOpen?: Dispatch<React.SetStateAction<boolean>>;
}
export default function ProgramExerciseEdit({
  programExercise,
  programExerciseLength,
  modelRef,
  setIsOpen,
  handleProgramExercise,
}: ProgramExerciseEditProps) {
  const {
    handleSelectExercise,
    filterExercises,
    handleSets,
    onDaysChange,
    handleInputChange,
    handleSetChange,
    validateProgramExercise,
    programExerciseErrors,
    coreSetsErrors,
    programExerciseToEdit,
    exercises,
    restProgramExerciseToEdit,
  } = useProgramExerciseEdit(programExercise, programExerciseLength);


  const onUpsertProgramExercise = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!programExerciseToEdit) return;
    const isValid = validateProgramExercise(programExerciseToEdit);
    if (!isValid) return;

    const peToUpsert: IProgramExerciseEditDTO = {
      ...programExerciseToEdit,
      crudOperation: !programExerciseToEdit?.id?.startsWith("temp")
        ? "update"
        : "create",
    };

    handleProgramExercise(peToUpsert);
    restProgramExerciseToEdit();
    setIsOpen!(false);
  };

  const onDeleteProgramExercise = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const peToRemove: IProgramExerciseEditDTO = {
      ...programExerciseToEdit!,
      crudOperation: "delete",
      order: programExerciseLength ?? Infinity,
    };
    handleProgramExercise(peToRemove);
    setIsOpen!(false);
  };

  if (!programExerciseToEdit) return <div>Loading...</div>;

  const { order, notes, daysOfWeek, exercise, coreSets } =
    programExerciseToEdit;

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
          defaultValue={order >= 1 ? order : programExerciseLength ?? 1}
          divStyle=" grid grid-cols-[auto_auto_1fr] justify-end gap-2 items-center"
          className="border w-[4ch] aspect-square rounded text-center order-2  "
          min={1}
          onChange={handleInputChange}
        >
          <Label labelPosition="input" className="order-1" htmlFor="order">
            Order:
          </Label>
          {programExerciseErrors?.order ? (
            <Label htmlFor="order" className="order-3 text-sm text-red-orange">
              {programExerciseErrors?.order}
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
          {programExerciseErrors?.notes ? (
            <Label htmlFor="order" className=" text-sm text-red-orange">
              {programExerciseErrors?.notes}
            </Label>
          ) : null}
        </TextArea>
        <div className="grid gap-1">
          <Label htmlFor="daysOfWeek">Days of the week</Label>
          <CheckboxMulti
            options={calendarUtil.getShortWeekDays(true)}
            selectedOptions={
              calendarUtil.fullWeekdaysToShort(daysOfWeek!) ?? []
            }
            inputName="daysOfWeek"
            listStyle=""
            onChange={onDaysChange}
          />
          {programExerciseErrors?.daysOfWeek ? (
            <Label htmlFor="order" className=" text-sm text-red-orange">
              {programExerciseErrors?.daysOfWeek}
            </Label>
          ) : null}
        </div>
        <SelectWithSearch
          options={exercises}
          selectedOptionName={exercise?.name}
          inputName="exercise"
          handleSelect={handleSelectExercise}
          filterOptions={filterExercises}
          parentModelRef={modelRef}
          error={programExerciseErrors?.exerciseId}
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
        <ProgramExerciseCoreSetsEditList
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
            restProgramExerciseToEdit();
            setIsOpen!(false);
          }}
        >
          Cancel
        </Button>
        <div className="inline-flex gap-2">
          <Button buttonStyle="warning" onClick={onDeleteProgramExercise}>
            Delete
          </Button>

          <Button type="button" buttonStyle="save" onClick={onUpsertProgramExercise}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
