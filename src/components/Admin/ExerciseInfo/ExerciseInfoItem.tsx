import  { memo } from "react";
import type { IExerciseInfoDTO } from "../../../models/exerciseInfo.model";
import { toTitle } from "../../../utils/toTitle";
import DeleteBtn from "../../UI/DeleteButton";
import IconTrash from "../../UI/Icons/IconTrash";
import ExerciseInfoEdit from "./ExerciseInfoEdit";

interface ExerciseInfoItemProps {
  exerciseInfo: IExerciseInfoDTO;
  onDelete: (id?: string) => Promise<void>;
}

function ExerciseInfoItem({ exerciseInfo, onDelete }: ExerciseInfoItemProps) {
  console.info("ExerciseInfoItem component rendered");
  const { name, image, id } = exerciseInfo;
  const { imgUrl } = image || { imgUrl: "placeholder.png" };

  const deleteAction = async () => {
    await onDelete(id);
  };
  return (
    <>
      <img src={imgUrl} height={48} width={48} alt="" className="" />
      <p>{toTitle(name)}</p>
      <div className="grid grid-cols-2 min-h-full h-full gap-4">
        <ExerciseInfoEdit
          exerciseInfo={exerciseInfo}
          category={exerciseInfo.category}
        />
        <DeleteBtn deleteAction={deleteAction}>
          <IconTrash className="fill-amber stroke-none h-full aspect-square group-hover:stroke-main-black transition-all duration-300" />
        </DeleteBtn>
      </div>
    </>
  );
}

export default memo(
  ExerciseInfoItem,
  (prevProps, nextProps) => prevProps.exerciseInfo === nextProps.exerciseInfo
);
