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
    programExerciseToEdit,
    handleSelectExercise,
    filterExercises,
    handleSets,
    onDaysChange,
    handleInputChange,
    handleSetChange,
    exercises,
  } = useProgramExerciseEdit(programExercise, programExerciseLength);

  const onUpsertProgramExercise = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!programExerciseToEdit) return;

    const peToUpsert: IProgramExerciseEditDTO = {
      ...programExerciseToEdit,
      crudOperation: !programExerciseToEdit?.id?.startsWith("temp")
        ? "update"
        : "create",
    };

    handleProgramExercise(peToUpsert);
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

  const { order, notes, daysOfWeek, exercise, coreSets } = programExerciseToEdit;

  const isExercise = !!exercise?.id;
  return (
    <div
      className={` grid ${
        isExercise ? "grid-cols-2 gap-4" : "grid-cols-1"
      }  bg-main-orange p-4 rounded h-[25rem] max-h-svh grid-rows-1 `}
      ref={modelRef}
    >
      <div className=" flex flex-col items gap-4 w-small h-full justify-around">
        <Input
          name="order"
          type="number"
          defaultValue={order >= 1 ? order : programExerciseLength ?? 1}
          divStyle=" flex flex-row-reverse justify-end gap-2 items-center"
          className="border w-10 rounded text-center  "
          min={1}
          onChange={handleInputChange}
        >
          <Label labelPosition="input" htmlFor="order">
            Order:
          </Label>
        </Input>
        <TextArea
          defaultValue={notes}
          name="notes"
          rows={3}
          placeholder=""
          className="w-full h-20 block peer outline-offset-0  p-2 resize-none  "
          divStyle="bg-main-orange border-1 rounded h-auto col-span-full relative group "
          onChange={handleInputChange}
        >
          <Label labelPosition="textArea" isMoveUpEffect={true} htmlFor="note">
            Note
          </Label>
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
        </div>
        <SelectWithSearch
          options={exercises}
          selectedOptionName={exercise?.name}
          inputName="exercise"
          handleSelect={handleSelectExercise}
          filterOptions={filterExercises}
          parentModelRef={modelRef}
          SelectedComponent={
            exercise?.id ? exercise?.name : "Select an Exercise"
          }
          SelectItemComponent={({ option }) => (
            <span className="w-full h-full">{option.name}</span>
          )}
        />
      </div>

      {isExercise ? (
        <ProgramExerciseCoreSetsEditList
          coreSets={coreSets}
          handleSets={handleSets}
          handleChange={handleSetChange}
        />
      ) : null}
      <div className="col-span-full flex justify-between">
        <Button
          className="w-16 border rounded hover:border-red-orange
                           cursor-pointer h-10
                           hover:text-red-orange transition-all duration-300"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen!(false);
          }}
        >
          Cancel
        </Button>
        <Button
          className="w-16 border rounded hover:border-red-orange
                           cursor-pointer h-10
                           hover:text-red-orange transition-all duration-300"
          onClick={onDeleteProgramExercise}
        >
          Delete
        </Button>

        <Button
          className={`bg-inherit border-1 w-16 hover:bg-main-orange h-10
                                  hover:text-white rounded transition-all duration-300
                                  hover:cursor-pointer  `}
          onClick={onUpsertProgramExercise}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
