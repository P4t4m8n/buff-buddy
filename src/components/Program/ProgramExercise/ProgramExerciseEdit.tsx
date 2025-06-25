import {
  useCallback,
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type MouseEvent,
} from "react";
import type { IProgramExerciseEditDTO } from "../../../models/programExercise.model";
import { programExerciseService } from "../../../services/programExercise.service";
import { useExerciseStore } from "../../../store/exercise.store";
import Input from "../../UI/Form/Input";
import Label from "../../UI/Form/Label";
import TextArea from "../../UI/Form/TextArea";
import CheckboxMulti from "../../UI/Form/CheckboxMulti";
import { calendarUtil } from "../../../utils/calendar.util";
import SelectWithSearch from "../../UI/Form/SelectWithSearch";
import type { IExerciseDTO } from "../../../models/exercise.model";
import { coreSetsService } from "../../../services/coreSets.service";
import ProgramExerciseSetsList from "./ProgramExerciseSetsList";
import Button from "../../UI/Button";

interface ProgramExerciseEditProps {
  programExercise?: IProgramExerciseEditDTO;
  programExerciseLength?: number;
  modelRef: React.RefObject<HTMLDivElement | null>;
  handleProgramExercise: (programExercise: IProgramExerciseEditDTO) => void;
  setModel: Dispatch<React.SetStateAction<boolean>>;
}
export default function ProgramExerciseEdit({
  programExercise,
  programExerciseLength,
  modelRef,
  setModel,
  handleProgramExercise,
}: ProgramExerciseEditProps) {
  const [programExerciseToEdit, setProgramExerciseToEdit] =
    useState<IProgramExerciseEditDTO | null>(null);
  const exercises = useExerciseStore((state) => state.exercises);
  const loadExercises = useExerciseStore((state) => state.loadExercises);

  useEffect(() => {
    setProgramExerciseToEdit(
      programExercise
        ? programExercise
        : programExerciseService.getEmpty(programExerciseLength)
    );
    loadExercises();
  }, []);

  const handleSelectExercise = (exercise: IExerciseDTO) => {
    setProgramExerciseToEdit((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        exercise: exercise,
        coreSets: coreSets ? coreSets : [coreSetsService.getEmpty()],
      };
    });
  };

  const filterExercises = (searchValue: string) => {
    if (!searchValue) return exercises;
    return exercises.filter((exercise) =>
      exercise?.name?.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const addSet = () => {
    const emptySet = coreSetsService.getEmpty(coreSets?.length ?? 0);
    setProgramExerciseToEdit((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        coreSets: [...(prev.coreSets || []), emptySet],
      };
    });
  };

  const removeSet = (id?: string) => {
    setProgramExerciseToEdit((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        coreSets: prev.coreSets
          ?.filter((set) => set.id !== id)
          .map((set, index) => ({ ...set, order: index + 1 })),
      };
    });
    setModel(false);
  };

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
    setModel(false);
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
    setModel(false);
  };

  const onDaysChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const isChecked = target.checked;
    const fixedDay = calendarUtil.shortWeekdayToFull(value);
    setProgramExerciseToEdit((prev) => {
      if (!prev) return null;
      const newDaysOfWeek = isChecked
        ? [...(prev.daysOfWeek || []), fixedDay]
        : (prev.daysOfWeek || []).filter((day) => day !== fixedDay);
      return {
        ...prev,
        daysOfWeek: newDaysOfWeek,
      };
    });
  };

  const handleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    setProgramExerciseToEdit((prev) => {
      if (!prev) return null;
      return type === "number"
        ? { ...prev, [name]: parseInt(value, 10) }
        : { ...prev, [name]: value };
    });
  };
  const handleSetChange = useCallback((e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
   
    const [key, id] = name.split("-");
 
    setProgramExerciseToEdit((prev) => {
      if (!prev) return null;
      const updatedCoreSets = prev.coreSets?.map((set) => {
        if (set.id === id) {
          return {
            ...set,
            [key]: type === "checkbox" ? checked : parseInt(value, 10),
          };
        }
        return set;
      });
      return {
        ...prev,
        coreSets: updatedCoreSets,
      };
    });
  }, []);

  if (!programExerciseToEdit) return <div>Loading...</div>;
  const { order, note, daysOfWeek, exercise, coreSets } = programExerciseToEdit;
  const isExercise = !!exercise?.id;
  const isEdit = !programExerciseToEdit?.id?.startsWith("temp");
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
          defaultValue={order >= 0 ? order : programExerciseLength ?? 0}
          divStyle=" flex flex-row-reverse justify-end gap-2 items-center"
          className="border w-10 rounded text-center  "
          min={0}
          onChange={handleChange}
        >
          <Label labelPosition="input" htmlFor="order">
            Order:
          </Label>
        </Input>
        <TextArea
          defaultValue={note}
          name="note"
          rows={3}
          placeholder=""
          className="w-full h-20 block peer outline-offset-0  p-2 resize-none  "
          divStyle="bg-main-orange border-1 rounded h-auto col-span-full relative group "
          onChange={handleChange}
        >
          <Label labelPosition="textArea" isMoveUpEffect={true} htmlFor="note">
            Note
          </Label>
        </TextArea>
        <div className="grid gap-1">
          <Label htmlFor="daysOfWeek">Days of the week</Label>
          <CheckboxMulti
            options={calendarUtil.getShortWeekDays(true)}
            selectedOptions={daysOfWeek ?? []}
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
        <ProgramExerciseSetsList
          coreSets={coreSets}
          addSet={addSet}
          removeSet={removeSet}
          handleChange={handleSetChange}
        />
      ) : null}
      <div className="col-span-full flex justify-between">
        {isEdit ? (
          <Button
            className="w-16 border rounded hover:border-red-orange
                           cursor-pointer h-10
                           hover:text-red-orange transition-all duration-300"
            onClick={onDeleteProgramExercise}
          >
            Delete
          </Button>
        ) : (
          <Button
            className="w-16 border rounded hover:border-red-orange
                           cursor-pointer h-10
                           hover:text-red-orange transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setModel(false);
            }}
          >
            Cancel
          </Button>
        )}
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
