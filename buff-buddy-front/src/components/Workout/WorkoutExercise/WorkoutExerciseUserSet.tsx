import type { IUserSetEditDTO } from "../../../models/set.model";
import Button from "../../UI/Button";
import Input from "../../UI/Form/Input";
import Label from "../../UI/Form/Label";
import React from "react";

interface IWorkoutExerciseUserSetProps {
  userSet: IUserSetEditDTO;
  errors?: Record<string, string>;
  handleUserSetsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logUserSet: (id?: string) => void;
}

//TODO?? Improve memo so only the component with error will re-render

const WorkoutExerciseUserSet: React.FC<IWorkoutExerciseUserSetProps> =
  React.memo(({ userSet, handleUserSetsChange, logUserSet, errors }) => {
    const {
      id,
      reps,
      weight,
      restTime,
      isCompleted,
      isJointPain,
      isMuscleFailure,
      isBodyWeight,
    } = userSet;

    const inputStyle = `bg-amber rounded w-8 aspect-square  text-center border outline-none`;
    const divStyle = "inline-flex flex-row-reverse gap-1 items-center";

    const numberInputs = [
      {
        name: `reps-${id}`,
        value: reps || "",
        label: "Reps",
        isError: errors?.reps,
      },
      {
        name: `weight-${id}`,
        value: isBodyWeight ? "BW" : weight ?? "",
        label: "Weight",
        isError: errors?.weight,
      },
      {
        name: `restTime-${id}`,
        value: restTime || "",
        label: "Rest",
        isError: errors?.restTime,
      },
    ];

    const checkboxInputs = [
      {
        name: `isJointPain-${id}`,
        value: isJointPain,
        label: "Joint Pain",
      },
      {
        name: `isMuscleFailure-${id}`,
        value: isMuscleFailure,
        label: "Muscle Failure",
      },
    ];
    return (
      <div className="grid grid-cols-3 grid-rows-2 gap-y-3 justify-items-center content-between">
        {numberInputs.map((input) => {
          return input.value === "BW" ? (
            <div key={input.label} className={divStyle}>
              <p className={inputStyle}>{input.value}</p>
              <h5>{input.label}</h5>
            </div>
          ) : (
            <Input
              key={input.name}
              name={input.name}
              type="number"
              value={input.value}
              divStyle={divStyle}
              className={
                inputStyle + " " + (input?.isError ? "border-red-500" : "")
              }
              min={1}
              step={"any"}
              onChange={handleUserSetsChange}
            >
              <Label className="" htmlFor={input.name}>
                {input.label}:
              </Label>
            </Input>
          );
        })}
        {checkboxInputs.map((input) => (
          <Input
            key={input.name}
            name={input.name}
            id={input.name}
            type="checkbox"
            checked={!!input.value}
            divStyle=" flex flex-col-reverse gap-1 items-center  "
            className=" cursor-pointer "
            onChange={handleUserSetsChange}
          >
            <Label htmlFor={input.name}>{input.label}</Label>
          </Input>
        ))}

        <Button
          className={`text-amber hover:text-black w-fit ${
            isCompleted ? "bg-main-green" : ""
          }`}
          buttonStyle="model"
          onClick={() => logUserSet(id)}
          type="button"
        >
          {isCompleted ? "Update" : "Complete"}
        </Button>
      </div>
    );
  });

export default WorkoutExerciseUserSet;
