import type { ChangeEvent, MouseEvent } from "react";
import type { ICoreSetEditDTO } from "../../../models/set.model";
import Button from "../../UI/Button";
import ProgramExerciseCoreSetsEdit from "./ProgramExerciseCoreSetsEdit";

interface ProgramExerciseCoreSetsEditListProps {
  coreSets?: ICoreSetEditDTO[];
  handleSets: (set?: ICoreSetEditDTO) => void;
  handleChange: (e: ChangeEvent) => void;
}
export default function ProgramExerciseCoreSetsEditList({
  coreSets,
  handleSets,
  handleChange,
}: ProgramExerciseCoreSetsEditListProps) {
  const onAddSet = (e: MouseEvent) => {
    e.preventDefault();
    handleSets();
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
            <ProgramExerciseCoreSetsEdit
              set={set}
              onHandleChange={handleChange}
              removeSet={handleSets}
            />
          </li>
        ))}
        <Button onClick={onAddSet} className=" h-6 hover:bg-green-600 rounded">
          Add Set
        </Button>
      </ul>
    </div>
  );
}
