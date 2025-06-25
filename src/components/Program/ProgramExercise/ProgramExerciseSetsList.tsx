import type { ChangeEvent, MouseEvent } from "react";
import type { ICoreSetDTO } from "../../../models/set.model";
import Button from "../../UI/Button";
import Input from "../../UI/Form/Input";
import Label from "../../UI/Form/Label";

interface ProgramExerciseSetsListProps {
  coreSets?: ICoreSetDTO[];
  removeSet: (id?: string) => void;
  addSet: () => void;
  handleChange?: (e: ChangeEvent) => void;
}
export default function ProgramExerciseSetsList({
  coreSets,
  removeSet,
  addSet,
  handleChange,
}: ProgramExerciseSetsListProps) {
  const onAddSet = (e: MouseEvent) => {
    e.preventDefault();
    addSet();
  };

  return (
    <div className="h-full w-small">
      <h3 className="underline text-lg font-semibold">Core Sets</h3>
      <ul className="overflow-y-auto grid gap-2 w-full h-[calc(100%-1.75rem)]">
        {coreSets?.map((set) => (
          <li
            key={set.id}
            className="flex flex-col h-fit w-full gap-1 border rounded p-1"
          >
            <div className="flex justify-between border-b pb-4">
              <Input
                name={"order-" + set.id}
                type="number"
                defaultValue={set.order}
                divStyle=" flex flex-row-reverse justify-end gap-2 items-center"
                className="border w-10 rounded text-center  "
                min={0}
                onChange={handleChange}
              >
                <Label htmlFor={"order-" + set.id}>Order:</Label>
              </Input>
              <Input
                name={"isWarmup-" + set.id}
                type="checkbox"
                defaultChecked={set.isWarmup}
                divStyle="flex items-center gap-2"
                className=" cursor-pointer"
                onChange={handleChange}
              >
                <Label htmlFor={"isWarmup-" + set.id}>Is Warmup</Label>
              </Input>
            </div>
            <div className="flex  justify-between ">
              <Input
                name={"reps-" + set.id}
                type="number"
                defaultValue={set.reps}
                divStyle=" flex flex-col-reverse items-center  "
                className="border w-12 rounded text-center   "
                min={0}
                onChange={handleChange}
              >
                <Label htmlFor={"reps-" + set.id}>Reps</Label>
              </Input>
              <Input
                name={"weight-" + set.id}
                type="number"
                defaultValue={set.weight}
                divStyle=" flex flex-col-reverse  items-center"
                className="border w-12 rounded text-center   "
                min={0}
                onChange={handleChange}
              >
                <Label htmlFor={"weight-" + set.id}>Weight</Label>
              </Input>
              <Input
                name={"restTime-" + set.id}
                type="number"
                defaultValue={set.restTime}
                divStyle=" flex flex-col-reverse items-center "
                className="border w-12 rounded text-center   "
                min={0}
                onChange={handleChange}
              >
                <Label htmlFor={"restTime-" + set.id}>Rest Time</Label>
              </Input>
            </div>
            <Button
              onClick={() => removeSet(set?.id)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </Button>
          </li>
        ))}
        <Button onClick={onAddSet} className=" h-6 hover:bg-green-600 rounded">
          Add Set
        </Button>
      </ul>
    </div>
  );
}
