import { memo } from "react";
import type { IExerciseInfoDTO } from "../../../models/exerciseInfo.model";
import { toTitle } from "../../../utils/toTitle";
import DeleteBtn from "../../UI/DeleteButton";
import IconTrash from "../../UI/Icons/IconTrash";
import ExerciseInfoEdit from "./ExerciseInfoEdit";

interface ExerciseInfoItemProps {
  item: IExerciseInfoDTO;
  onDelete: (id?: string) => Promise<void>;
  gridCols: string;
}

function ExerciseInfoItem({ item, onDelete, gridCols }: ExerciseInfoItemProps) {
  const { name, image, id } = item;
  const { imgUrl } = image || { imgUrl: "placeholder.png" };

  const deleteAction = async () => {
    await onDelete(id);
  };
  return (
    <li
      className={`grid grid-cols-${gridCols} h-20 items-center justify-center`}
    >
      <img src={imgUrl} height={48} width={48} alt="" className="" />
      <p>{toTitle(name)}</p>
      <div className="grid grid-cols-2 min-h-full h-full gap-4">
        <ExerciseInfoEdit exerciseInfo={item} category={item.category} />
        <DeleteBtn deleteAction={deleteAction}>
          <IconTrash
            className="fill-amber stroke-none h-full aspect-square
           group-hover:stroke-main-black transition-all duration-300"
          />
        </DeleteBtn>
      </div>
    </li>
  );
}

export default memo(
  ExerciseInfoItem,
  (prevProps, nextProps) => prevProps.item === nextProps.item
);
