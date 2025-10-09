//UI
import LinkComponent from "../../../UI/Link";
import GenericDeleteButton from "../../../UI/GenericDeleteButton";
//Types
import type { IExercisePreviewProps } from "../../../../models/exercise.model";
import { useDeleteContext } from "../../../../hooks/shared/useDeleteContext";

export default function ExerciseListActions({
  item: exercise,
  deleteItem,
}: Partial<IExercisePreviewProps>) {
  if (!deleteItem) return null;
  const exerciseId = exercise?.id;
  const isDeleting = useDeleteContext();

  return (
    <nav className="flex gap-3 ">
      <LinkComponent
        to={`/exercises/${exerciseId}`}
        mode="details"
        linkStyle="model"
        className="w-fit mr-auto"
      />

      <LinkComponent
        to={`/exercises/edit/${exerciseId}`}
        mode="edit"
        linkStyle="model"
        className="w-fit"
      />
      <GenericDeleteButton
        itemId={exerciseId!}
        isDeleting={!!isDeleting}
        deleteAction={deleteItem}
      />
    </nav>
  );
}
