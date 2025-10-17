import type {
  IMealFoodItemDTO,
  IMealFoodItemEditDTO,
} from "../../../../shared/models/meal.model";
import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";
import { toTitle } from "../../utils/toTitle";
import Button from "../UI/Button";
import GenericModel from "../UI/GenericModel";
import MealFoodItemEditModel from "./MealEdit/MealFoodItemEditModel";

interface IMealFoodItemPreviewProps {
  item: IMealFoodItemDTO | IMealFoodItemEditDTO;
  removeMealFoodItem: (mealFoodItemId?: string) => void;
  handleMealFoodItem: (mealFoodItem: IMealFoodItemEditDTO) => void;
}
export default function MealFoodItemPreview({
  item: mealFoodItem,
  removeMealFoodItem,
  handleMealFoodItem,
}: IMealFoodItemPreviewProps) {
  const { quantity, foodItem, id: mealFoodItemId } = mealFoodItem;

  const { name: foodItemName, brand, images } = foodItem ?? {};
  const img = images?.[0]?.url ? images?.[0]?.url : "/images/placeholder.webp";
  const brandName = brand?.name ?? "";

  const onDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    removeMealFoodItem(mealFoodItemId);
  };
  return (
    <li className="grid grid-cols-[4rem_1fr] bg-black-300 rounded p-4 gap-4">
      <img className=" row-span-3 aspect-square w-20 rounded" src={img} />
      <h3 className=" truncate">{toTitle(foodItemName)}</h3>
      <p className=" truncate">{toTitle(brandName)}</p>

      <span className="inline-flex items-center">
        <h6>Quantity:</h6>
        <p>{quantity}gr</p>
      </span>
      <div className=" col-span-2 w-full grid grid-cols-2 gap-32">
        <Button
          onClick={onDelete}
          buttonStyle="model"
          className="cursor-pointer"
        >
          {ModelButtonIcon("delete")}
        </Button>
        <GenericModel
          Model={MealFoodItemEditModel}
          modelProps={{ handleMealFoodItem, mealFoodItem, removeMealFoodItem }}
          mode="edit"
          buttonProps={{
            buttonStyle: "model",
            className: "",
          }}
          isOverlay={false}
          isPortal={true}
        />
      </div>
    </li>
  );
}
