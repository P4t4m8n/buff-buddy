import type { IExerciseDTO } from "../../models/exercise.model";
import { useExerciseStore } from "../../store/exercise.store";
import { toTitle } from "../../utils/toTitle";
import Button from "../UI/Button";
import IconTrash from "../UI/Icons/IconTrash";
import WrapperModel from "../UI/Wrappers/WrapperModel";
import ExerciseDetails from "./ExerciseDetails";
import ExerciseEdit from "./ExerciseEdit";

interface ExerciseTableItemProps {
  item: IExerciseDTO;
  onDelete: (id?: string) => Promise<void>;
}
export default function ExerciseTableItem({
  item,
  onDelete,
}: ExerciseTableItemProps) {
  const isLoading = useExerciseStore((state) => state.isLoading);
  const { id, name, muscles, equipment, types } = item;
  const infos = [muscles, equipment, types].map((info, idx) => (
    <p className="truncate hidden md:inline" key={idx}>
      {info?.map((m) => toTitle(m)).join(", ")}
    </p>
  ));
  return (
    <>
      <p className="truncate ">{name}</p>
      {infos.map((info) => info)}

      <div className="grid grid-cols-2 lg:grid-cols-3 justify-items-center min-h-full h-full gap-1 ">
        <WrapperModel
          item={item}
          mode="details"
          buttonClass=" place-self-end lg:place-self-auto"
        >
          <ExerciseDetails exercise={item} />
        </WrapperModel>
        <WrapperModel
          item={item}
          mode="edit"
          buttonClass=" place-self-start lg:place-self-auto"
        >
          <ExerciseEdit exercise={item} />
        </WrapperModel>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(id);
          }}
          buttonStyle="model"
          className=" col-span-2 lg:col-span-1"
          disabled={isLoading}
        >
          <IconTrash
            className="fill-amber stroke-none h-full aspect-square
           group-hover:fill-main-black transition-all duration-300"
          />
        </Button>
      </div>
    </>
  );
}
