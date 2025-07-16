import type { MouseEvent, RefObject } from "react";
import type { ICoreSetEditDTO } from "../../../../../models/set.model";
import Input from "../../../../UI/Form/Input";
import Label from "../../../../UI/Form/Label";
import { toTitle } from "../../../../../utils/toTitle";
import Button from "../../../../UI/Button";

const INFINITY = 100000;

interface IWorkoutExerciseCoreSetsEditProps {
  set: ICoreSetEditDTO;
  onHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeSet: (set: ICoreSetEditDTO) => void;
  ref?: RefObject<HTMLLIElement | null>;
  errors?: Partial<Record<string, string>> | null;
}
export default function WorkoutExerciseCoreSetsEdit({
  set,
  onHandleChange,
  removeSet,
  ref,
  errors,
}: IWorkoutExerciseCoreSetsEditProps) {
  const onRemoveSet = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const setToRemove: ICoreSetEditDTO = {
      ...set,
      reps: 1, // Resetting reps to 1 to avoid issues with empty values
      weight: 1, // Resetting weight to 0 to avoid issues with empty values
      restTime: 1, // Resetting restTime to 0 to avoid issues with empty values
      crudOperation: "delete",
      order: INFINITY, // Set order to Infinity to ensure it is removed from the list
    };
    removeSet(setToRemove);
  };

  const { id, order, reps, weight, restTime, isWarmup, isBodyWeight } = set;
  const inputStyle = "border w-input aspect-square rounded text-center";

  const inputs = [
    { name: "reps", value: reps, isError: !!errors?.reps },
    { name: "weight", value: weight, isError: !!errors?.weight },
    { name: "restTime", value: restTime, isError: !!errors?.restTime },
  ];
  return (
    <li
      ref={ref}
      className="flex flex-col h-[8.75rem] gap-1 w-full border rounded justify-between p-2"
    >
      <div className="flex justify-between">
        <Input
          name={"order-" + id}
          type="number"
          defaultValue={order || 1}
          divStyle=" flex flex-row-reverse justify-end gap-2 items-center"
          className="border w-input aspect-square  rounded text-center  "
          min={1}
          onChange={onHandleChange}
        >
          <Label htmlFor={"order-" + id}>Order:</Label>
        </Input>
        <Input
          name={"isWarmup-" + id}
          type="checkbox"
          checked={isWarmup}
          divStyle="flex items-center gap-2 flex-col-reverse"
          className=" cursor-pointer  "
          onChange={onHandleChange}
        >
          <Label htmlFor={"isWarmup-" + id}>Warmup?</Label>
        </Input>
        <Input
          name={"isBodyWeight-" + id}
          type="checkbox"
          checked={isBodyWeight}
          divStyle="flex flex-col-reverse items-center gap-2"
          className=" cursor-pointer "
          onChange={onHandleChange}
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
              onChange={onHandleChange}
            >
              <Label
                className={`text-xs  ${input.isError ? "text-red-orange" : ""}`}
                htmlFor={`${input.name}-${id}`}
              >
                {toTitle(input.name)}
              </Label>
            </Input>
          );
        })}

        <Button onClick={onRemoveSet} buttonStyle="warning">
          Remove
        </Button>
      </div>
    </li>
  );
}
