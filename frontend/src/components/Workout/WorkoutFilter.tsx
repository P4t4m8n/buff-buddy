//Lib
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
//UI
import Button from "../UI/Button";
import Input from "../UI/Form/Input";
import Label from "../UI/Form/Label";
import InputWithError from "../UI/Form/InputWithError";
//Icons
import { IconPlus } from "../UI/Icons/IconPlus";
import { IconSearch } from "../UI/Icons/IconSearch";
//Types
import type { IWorkoutFilter } from "../../../../shared/models/workout.model";

interface IWorkoutFilterProps {
  workoutsFilter: IWorkoutFilter;
  isLoading?: boolean;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  onResetForm: () => void;
}

//TODO:Maybe move the local state for filter to manage clearing the filter better?
function WorkoutFilterMemo({
  workoutsFilter,
  isLoading,
  onSearch,
  onResetForm,
}: IWorkoutFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isTemplate, workoutName, programName, exerciseName, ownerName } =
    workoutsFilter;

  const inputs = [
    { label: "workout", value: workoutName, name: "workoutName" },
    { label: "exercise", value: exerciseName, name: "exerciseName" },
    { label: "program", value: programName, name: "programName" },
    { label: "owner", value: ownerName, name: "ownerName" },
  ];

  const baseFormStyle =
    "transition-all duration-300 ease-in-out h-full flex md:row-span-2 ";
  const isFormOpenStyle = isOpen
    ? "w-full md:w-small p-desktop bg-black-400 absolute inset-0 md:relative flex flex-col z-10 gap-4"
    : "pl-4 md:w-12  items-center md:items-start ";

  const formStyle = twMerge(baseFormStyle, isFormOpenStyle);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSearch(e);
    setIsOpen(false);
  };

  return (
    <form onSubmit={onSubmit} className={formStyle}>
      {isOpen ? (
        <>
          <span className="inline-flex justify-between items-center w-full">
            <h2 className="text-lg">Filter & Search</h2>
            <Button
              className="border rounded-full w-8 h-8 p-1 flex-center"
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <IconPlus className="w-full stroke-main-orange rotate-45" />
            </Button>
          </span>

          {inputs.map((input) => (
            <InputWithError
              key={input.name}
              inputProps={{
                defaultValue: input.value ?? "",
                type: "text",
                name: input.name,
                id: `${input.name}-workout-filter`,
                placeholder: `Search by ${input.label}...`,
                className: "order-2 px-2 py-1 bg-black-900 ",
              }}
              labelProps={{
                htmlFor: `${input.name}-workout-filter`,
                children: `${input.label} name`,
                isMoveUpEffect: false,
                className: "order-1 text-sm",
              }}
              divStyle="h-fit w-full grid gap-1 "
            />
          ))}

          {/* <Input
            type="checkbox"
            name="isTemplate"
            defaultChecked={!!isTemplate}
            divStyle="flex  items-center gap-2 "
            className=" cursor-pointer w-fit "
          >
            <Label> "Template" </Label>
          </Input> */}
          <div className="flex mt-auto gap-8 w-full">
            <Button
              type="reset"
              buttonStyle="warning"
              className="w-full"
              disabled={isLoading}
              onClick={onResetForm}
            >
              Reset
            </Button>
            <Button
              disabled={isLoading}
              type="submit"
              buttonStyle="save"
              className="w-full"
            >
              <p>Search</p>
            </Button>
          </div>
        </>
      ) : (
        <Button
          className="border rounded-full w-8 h-8 p-1 flex-center"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <IconSearch className="stroke-main-orange w-full" />
        </Button>
      )}
    </form>
  );
}

const arePropsEqual = (
  prevProps: IWorkoutFilterProps,
  nextProps: IWorkoutFilterProps
) => {
  if (
    prevProps.workoutsFilter !== nextProps.workoutsFilter ||
    prevProps.isLoading !== nextProps.isLoading
  ) {
    return false;
  }

  return true;
};

export default React.memo(
  WorkoutFilterMemo,
  arePropsEqual
) as typeof WorkoutFilterMemo;
