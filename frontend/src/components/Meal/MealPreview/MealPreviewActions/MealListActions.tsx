import { MEAL_ROUTES } from "../../../../consts/routes.const";
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
    <div className="flex items-center gap-3 self-end">
      <LinkComponent
        to={`${MEAL_ROUTES.MEALS_PAGE_ROUTE}/${mealId}`}
        mode="details"
        linkStyle="model"
        className="w-fit mr-auto"
      ></LinkComponent>
      <LinkComponent
        to={`${MEAL_ROUTES.MEAL_EDIT_ROUTE}/${mealId}`}
        mode="edit"
        linkStyle="model"
        className="w-fit"
      ></LinkComponent>
      <GenericDeleteButton
        itemId={mealId ?? ""}
        isDeleting={!!isDeleting}
        deleteAction={deleteItem}
      />
    </div>
  );
}
