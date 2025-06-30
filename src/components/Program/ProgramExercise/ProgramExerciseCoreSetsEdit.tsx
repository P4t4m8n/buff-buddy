import type { MouseEvent } from "react";
import type { ICoreSetEditDTO } from "../../../models/set.model";
import Button from "../../UI/Button";
import Input from "../../UI/Form/Input";
import Label from "../../UI/Form/Label";

interface IProgramExerciseCoreSetsEditProps {
  set: ICoreSetEditDTO;
  onHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeSet: (set: ICoreSetEditDTO) => void;
}
export default function ProgramExerciseCoreSetsEdit({
  set,
  onHandleChange,
  removeSet,
}: IProgramExerciseCoreSetsEditProps) {
  const onRemoveSet = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const setToRemove: ICoreSetEditDTO = {
      ...set,
      crudOperation: "delete",
      order: Infinity, // Set order to Infinity to ensure it is removed from the list
    };
    removeSet(setToRemove);
  };

  const { id, order, reps, weight, restTime, isWarmup } = set;
  return (
    <>
   
      <div className="flex justify-between border-b pb-4">
        <Input
          name={"order-" + id}
          type="number"
          defaultValue={order || 1}
          divStyle=" flex flex-row-reverse justify-end gap-2 items-center"
          className="border w-10 rounded text-center  "
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
          className=" cursor-pointer"
          onChange={onHandleChange}
        >
          <Label htmlFor={"isWarmup-" + id}>Is Warmup</Label>
        </Input>
      </div>
      <div className="flex  justify-between ">
        <Input
          name={"reps-" + id}
          type="number"
          defaultValue={reps}
          divStyle=" flex flex-col-reverse items-center  "
          className="border w-12 rounded text-center   "
          min={1}
          onChange={onHandleChange}
        >
          <Label htmlFor={"reps-" + id}>Reps</Label>
        </Input>
        <Input
          name={"weight-" + id}
          type="number"
          defaultValue={weight}
          divStyle=" flex flex-col-reverse  items-center"
          className="border w-12 rounded text-center   "
          min={1}
          onChange={onHandleChange}
        >
          <Label htmlFor={"weight-" + id}>Weight</Label>
        </Input>
        <Input
          name={"restTime-" + id}
          type="number"
          defaultValue={restTime}
          divStyle=" flex flex-col-reverse items-center "
          className="border w-12 rounded text-center   "
          min={0}
          onChange={onHandleChange}
        >
          <Label htmlFor={"restTime-" + set.id}>Rest Time</Label>
        </Input>
      </div>
      <Button onClick={onRemoveSet} className="text-red-500 hover:text-red-700">
        Remove
      </Button>
    </>
  );
}
