import type { IMealFoodItemDTO } from "../../../../../shared/models/meal.model";
import { FOOD_ITEM_ROUTES, MEAL_ROUTES } from "../../../consts/routes.const";
import toTitle  from "../../../utils/toTitle";
import LinkComponent from "../../UI/Link";

interface IMealFoodItemDetailsListItemProps {
  item: IMealFoodItemDTO;
}
export default function MealFoodItemDetailsListItem({
  item,
}: IMealFoodItemDetailsListItemProps) {
  const { foodItem, quantity } = item;

  const { name: foodItemName, brand, images } = foodItem ?? {};
  const img = images?.[0]?.url ? images?.[0]?.url : "/images/placeholder.webp";
  const brandName = brand?.name ?? "";

  const detailsLink =
    MEAL_ROUTES.MEALS_PAGE_ROUTE +
    FOOD_ITEM_ROUTES.FOOD_ITEM_DETAILS_ROUTE.replace(
      ":foodItemId",
      item.id ?? ""
    );

  return (
    <li>
      <LinkComponent
        to={detailsLink}
        className="grid grid-cols-[4rem_1fr] grid-rows-[auto_auto_auto] bg-black-300 rounded p-4 gap-x-4"
      >
        <img className=" row-span-3 aspect-square h-full rounded" src={img} />
        <h3 className=" truncate text-lg">{toTitle(foodItemName)}</h3>
        <p className=" truncate text-xs text-main-orange/65">
          {toTitle(brandName)}
        </p>
        <span className="inline-flex items-center text-main-orange/75 text-sm gap-1">
          <h6>quantity: </h6>
          <p> {quantity}gr</p>
        </span>
      </LinkComponent>
    </li>
  );
}
