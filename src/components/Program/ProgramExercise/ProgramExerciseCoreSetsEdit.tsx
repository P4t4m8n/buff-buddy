import type { MouseEvent, RefObject } from "react";
import type { ICoreSetEditDTO } from "../../../models/set.model";
import Button from "../../UI/Button";
import Input from "../../UI/Form/Input";
import Label from "../../UI/Form/Label";

const INFINITY = 100000;

interface IProgramExerciseCoreSetsEditProps {
  set: ICoreSetEditDTO;
  onHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeSet: (set: ICoreSetEditDTO) => void;
  ref?: RefObject<HTMLLIElement | null>;
}
export default function ProgramExerciseCoreSetsEdit({
  set,
  onHandleChange,
  removeSet,
  ref,
}: IProgramExerciseCoreSetsEditProps) {
  const onRemoveSet = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const setToRemove: ICoreSetEditDTO = {
      ...set,
      crudOperation: "delete",
      order: INFINITY, // Set order to Infinity to ensure it is removed from the list
    };
    removeSet(setToRemove);
  };

  const { id, order, reps, weight, restTime, isWarmup } = set;
  const inputStyle = "border  w-[4ch] aspect-square rounded text-center";
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
          className="border w-[4ch] aspect-square  rounded text-center  "
          min={1}
          onChange={onHandleChange}
        >
          <Label htmlFor={"order-" + id}>Order:</Label>
        </Input>
        <Input
          name={"isWarmup-" + id}
          type="checkbox"
          defaultChecked={isWarmup}
          divStyle="flex items-center gap-2"
          className=" cursor-pointer "
          onChange={onHandleChange}
        >
          <Label htmlFor={"isWarmup-" + id}>Is Warmup</Label>
        </Input>
      </div>
      <span className=" border-b"></span>
      <div className="flex  justify-between items-end ">
        <Input
          name={"reps-" + id}
          type="number"
          value={reps || ""}
          divStyle=" flex flex-col-reverse items-center  "
          className={inputStyle}
          min={1}
          onChange={onHandleChange}
        >
          <Label htmlFor={"reps-" + id}>Reps</Label>
        </Input>
        <Input
          name={"weight-" + id}
          type="number"
          value={weight || ""}
          divStyle=" flex flex-col-reverse  items-center"
          className={inputStyle}
          min={1}
          onChange={onHandleChange}
        >
          <Label htmlFor={"weight-" + id}>Weight</Label>
        </Input>
        <Input
          name={"restTime-" + id}
          type="number"
          value={restTime || ""}
          divStyle=" flex flex-col-reverse items-center "
          className={inputStyle}
          min={0}
          onChange={onHandleChange}
        >
          <Label htmlFor={"restTime-" + set.id}>Rest Time</Label>
        </Input>
        <Button onClick={onRemoveSet} buttonStyle="warning">
          Remove
        </Button>
      </div>
    </li>
  );
}
