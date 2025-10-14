import { useDeleteContext } from "../../../../hooks/shared/useDeleteContext";
import type { IMealPreviewProps } from "../../../../models/meal.model";
import GenericDeleteButton from "../../../UI/GenericDeleteButton";
import LinkComponent from "../../../UI/Link";

export default function MealListActions(props: Partial<IMealPreviewProps>) {
  const { item: meal, deleteItem } = props;

  if (!deleteItem) return null;
  const mealId = meal?.id;
  const isDeleting = useDeleteContext();
  return (
    <div className="flex items-center gap-3">
      <LinkComponent
        to={`meals/${mealId}`}
        mode="details"
        linkStyle="model"
        className="w-fit mr-auto"
      ></LinkComponent>
      <LinkComponent
        to={`/meals/edit/${mealId}`}
        mode="edit"
        linkStyle="model"
        className="w-fit"
      ></LinkComponent>
      <GenericDeleteButton
        itemId={mealId ?? ""}
        isDeleting={!!isDeleting}
        deleteAction={deleteItem!}
      />
    </div>
  );
}
