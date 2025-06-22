import type { IExerciseDTO } from "../../models/exercise.model";
import { toTitle } from "../../utils/toTitle";
import DeleteBtn from "../UI/DeleteButton";
import IconTrash from "../UI/Icons/IconTrash";
import ExerciseDetails from "./ExerciseDetails";
import ExerciseEdit from "./ExerciseEdit";

interface ExerciseTableItemProps {
  item: IExerciseDTO;
  onDelete: (id?: string) => Promise<void>;
  gridCols: string;
}
export default function ExerciseTableItem({
  item,
  gridCols,
  onDelete,
}: ExerciseTableItemProps) {
  const { id, name, muscles, equipment, types } = item;
  return (
    <li
      className={`p-4 grid ${gridCols} gap-6 shadow-[0_0_1px_1px_rgba(0,0,0,.1)]
                  hover:shadow-[0_0_2px_2px_rgba(0,0,0,.3)] transition-all duration-300 
                  rounded items-center`}
    >
      <p className="truncate">{name}</p>
      <p>{muscles?.map((m) => toTitle(m)).join(", ")}</p>
      <p>{equipment?.map((e) => toTitle(e)).join(",")}</p>
      <p>{types?.map((t) => toTitle(t)).join(",")}</p>
      <div className="grid grid-cols-3 min-h-full h-full gap-4">
        <ExerciseDetails exercise={item} />
        <ExerciseEdit exercise={item} />
        <DeleteBtn deleteAction={() => onDelete(id)}>
          <IconTrash
            className="fill-amber stroke-none h-full aspect-square
           group-hover:stroke-main-black transition-all duration-300"
          />
        </DeleteBtn>
      </div>
    </li>
  );
}
