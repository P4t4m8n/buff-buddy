import toTitle  from "../../../utils/toTitle";

import DietMealEditActions from "./MealPreviewActions/DietMealEditActions";
import MealListActions from "./MealPreviewActions/MealListActions";

import GenericCarousel from "../../UI/GenericCarousel";
import Tag from "../../UI/Tag";

import type { IMealPreviewProps } from "../../../models/meal.model";

export default function MealPreview(props: IMealPreviewProps) {
  const { name, mealType, mealFoodItems, images, id } = props.item;

  const imgUrl =
    images?.find((img) => img?.isPrimary)?.url ??
    "/images/placeholder.webp";

  const labels =
    mealFoodItems
      .map((m) => m.foodItem?.labels)
      ?.flat()
      .map((m) => m?.name ?? "") ?? [];
  const categories = mealFoodItems
    .map((m) => m.foodItem?.categories)
    .flat()
    .map((m) => m?.name ?? "");

  const carousalItem = [...new Set([...labels, ...categories])];

  return (
    <li className="border gap-x-4 gap-y-2 p-mobile rounded grid grid-cols-[5rem_calc(100%-6rem)] grid-rows-[auto_auto_1fr_1fr] h-full">
      <img
        className=" row-span-full aspect-square rounded object-fill"
        src={imgUrl}
      />

      <h3>{toTitle(name)}</h3>

      <span>
        <p>Type: {mealType}</p>
      </span>

      <GenericCarousel
        listName="Categories & Labels"
        items={[...carousalItem]}
        props={{}}
        ItemComponent={Tag}
        getKey={(item) => `${item}-${id}`}
      />

      <DynamicAction {...props} />
    </li>
  );
}

const DynamicAction = (props: IMealPreviewProps) => {
  const { actionType } = props;

  switch (actionType) {
    case "dietEdit":
      return <DietMealEditActions {...props} />;
    case "mealList":
      return <MealListActions {...props} />;
    default:
      return null;
  }
};
