import Label from "../UI/Form/Label";
import Input from "../UI/Form/Input";

import { toTitle } from "../../utils/toTitle";

import type { ChangeEvent } from "react";
import type { ICoreSetEditDTO } from "../../../../shared/models/set.model";
import type { TErrorCoreSets } from "../../models/errors.model";

interface IWorkoutExerciseCoreSetProps {
  coreSet?: ICoreSetEditDTO;
  handleChange: (e: ChangeEvent) => void;
  errors?: TErrorCoreSets;
}
export default function WorkoutExerciseCoreSet({
  coreSet,
  handleChange,
  errors,
}: IWorkoutExerciseCoreSetProps) {
  if (!coreSet)
    return <p className="text-center text-gray-500">No core sets available.</p>;

  const { id, hasWarmup, isBodyWeight, reps, weight, restTime, numberOfSets } =
    coreSet;

  const inputs = [
    { name: "reps", value: reps, isError: !!errors?.reps },
    { name: "weight", value: weight, isError: !!errors?.weight },
    { name: "restTime", value: restTime, isError: !!errors?.restTime },
    {
      name: "numberOfSets",
      value: numberOfSets,
      isError: !!errors?.numberOfSets,
    },
  ];
  const inputStyle = "border w-input aspect-square rounded text-center";

  return (
    <div className="w-full h-full grid gap-2 px-4 ">
      <h3 className="underline text-lg font-semibold px-4">Core Sets</h3>
      <div className="  flex flex-col  gap-1 w-full border rounded justify-between p-2">
        <div className="flex justify-between">
          <Input
            name={"hasWarmup-" + id}
            type="checkbox"
            checked={hasWarmup}
            divStyle="flex items-center gap-2 flex-col-reverse"
            className=" cursor-pointer  "
            onChange={handleChange}
          >
            <Label htmlFor={"hasWarmup-" + id}>Warmup?</Label>
          </Input>
          <Input
            name={"isBodyWeight-" + id}
            type="checkbox"
            checked={isBodyWeight}
            divStyle="flex flex-col-reverse items-center gap-2"
            className=" cursor-pointer "
            onChange={handleChange}
          >
            <Label htmlFor={"isBodyWeight-" + id}>Body Weight?</Label>
          </Input>
        </div>
        <span className=" border-b"></span>
        <div className="flex  justify-between items-end ">
          {inputs.map((input) => {
            return isBodyWeight && input.name === "weight" ? (
              <p
                key={input.name + id}
                className={
                  inputStyle +
                  " text-xs flex flex-col-reverse items-center justify-center p-1 aspect-square "
                }
              >
                Body
              </p>
            ) : (
              <Input
                key={input.name + id}
                name={`${input.name}-${id}`}
                type="number"
                step="any"
                value={input.value || ""}
                divStyle=" flex flex-col-reverse gap-1 items-center  "
                className={inputStyle}
                min={input.name === "reps" ? 1 : 0}
                onChange={handleChange}
              >
                <Label
                  className={`text-xs  ${
                    input.isError ? "text-red-orange" : ""
                  }`}
                  htmlFor={`${input.name}-${id}`}
                >
                  {toTitle(input.name)}
                </Label>
              </Input>
            );
          })}
        </div>
      </div>
    </div>
  );
}
