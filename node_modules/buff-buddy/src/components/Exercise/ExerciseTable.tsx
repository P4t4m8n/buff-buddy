import type { IExerciseDTO } from "../../../../shared/models/exercise.model";
import { toTitle } from "../../utils/toTitle";
import ExerciseTableItem from "./ExerciseTableItem";

interface ExerciseTableProps {
  exercises: IExerciseDTO[];
  onDelete?: (id?: string) => Promise<void>;
}
export default function ExerciseTable({
  exercises,
  onDelete,
}: ExerciseTableProps) {
  const tableHeader = ["Name", "Muscles", "Equipment", "Types", "Actions"];
  const gridCols =
    "grid-cols-[1fr_5.75rem] md:grid-cols-[minmax(10rem,1fr)_repeat(3,_1fr)_12.5rem]";
  return (
    
    <ul className="grid gap-2 p-4 w-full">
      <li className={`border-b grid ${gridCols} gap-6 p-4 `}>
        {tableHeader.map((title, idx) => (
          <h3
            key={title}
            className={`${
              idx > 0 && idx < tableHeader.length - 1 ? "hidden md:inline" : ""
            } $ ${
              idx === tableHeader.length - 1 ? "text-center lg:text-left " : ""
            }`}
          >
            {toTitle(title)}
          </h3>
        ))}
      </li>
      {exercises.map((item) => (
        <li
          className={`p-4 grid ${gridCols} w-full gap-6 shadow-[0_0_1px_1px_rgba(0,0,0,.1)]
                  hover:shadow-[0_0_2px_2px_rgba(0,0,0,.3)] transition-all duration-300 
                  rounded items-center`}
          key={item.id}
        >
          <ExerciseTableItem item={item} onDelete={onDelete!} />
        </li>
      ))}
    </ul>
  );
}
