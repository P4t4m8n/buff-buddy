import NumberInputWIthError from "../../../UI/Form/NumberInputWIthError";

import Label from "../../../UI/Form/Label";
import Input from "../../../UI/Form/Input";

import type { ChangeEvent } from "react";
import type { TValidationError } from "../../../../models/errors.model";
import type { ICoreStrengthSetEditDTO } from "../../../../../../shared/models/strengthSet.model";

interface IWorkoutExerciseCoreSetProps {
  coreSet?: ICoreStrengthSetEditDTO;
  handleChange: (e: ChangeEvent) => void;
  errors?: TValidationError<ICoreStrengthSetEditDTO> | null;
}
export default function WorkoutExerciseCoreStrengthSet({
  coreSet,
  handleChange,
  errors,
}: IWorkoutExerciseCoreSetProps) {
  if (!coreSet)
    return <p className="text-center text-gray-500">No core sets available.</p>;

  const {
    id: coreSetId,
    hasWarmup,
    isBodyWeight,
    reps,
    weight,
    restTime,
    numberOfSets,
  } = coreSet;

  const inputs = [
    { name: "reps", value: reps ?? 0, error: errors?.reps, label: "reps" },
    {
      name: "restTime",
      value: restTime ?? 0,
      error: errors?.restTime,
      label: "rest time",
    },
    {
      name: "numberOfSets",
      value: numberOfSets ?? 0,
      error: errors?.numberOfSets,
      label: "Number of sets",
    },
  ];
  const inputStyle = "border w-input aspect-square rounded text-center";

  const weightInputComponent = isBodyWeight ? (
    <p
      key={"weight" + coreSetId}
      className={
        inputStyle +
        " text-xs flex flex-col-reverse items-center justify-center p-1 aspect-square "
      }
    >
      Body
    </p>
  ) : (
    <NumberInputWIthError
      name="weight"
      onChange={handleChange}
      inputId={coreSetId}
      value={weight || ""}
      error={errors?.weight}
      label="Weight"
    />
  );

  return (
    <div className="w-full h-full grid gap-2 px-4 ">
      <h3 className="underline text-lg font-semibold px-4 text-center">
        Core Sets
      </h3>
      <div className="  flex flex-col  gap-1 w-full border rounded justify-between p-2">
        <div className="flex justify-between">
          <Input
            name={"hasWarmup-" + coreSetId}
            id={"hasWarmup-" + coreSetId}
            type="checkbox"
            checked={hasWarmup}
            divStyle="flex items-center gap-2 flex-col-reverse"
            className=" cursor-pointer  "
            onChange={handleChange}
          >
            <Label htmlFor={"hasWarmup-" + coreSetId}>Warmup?</Label>
          </Input>
          <Input
            name={"isBodyWeight-" + coreSetId}
            id={"isBodyWeight-" + coreSetId}
            type="checkbox"
            checked={isBodyWeight}
            divStyle="flex flex-col-reverse items-center gap-2"
            className=" cursor-pointer "
            onChange={handleChange}
          >
            <Label htmlFor={"isBodyWeight-" + coreSetId}>Body Weight?</Label>
          </Input>
        </div>
        <span className=" border-b"></span>
        <div className="flex  justify-between items-end ">
          {weightInputComponent}
          {inputs.map((input) => (
            <NumberInputWIthError
              {...input}
              onChange={handleChange}
              inputId={coreSetId}
              key={input.name + coreSetId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
