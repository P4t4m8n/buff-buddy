import type {
  IMealFoodItemDTO,
  IMealFoodItemEditDTO,
} from "../../../../shared/models/meal.model";
import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";
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

  const { images, name: foodItemName, brand } = foodItem ?? {};
  const img = images?.[0]?.url ?? "/images/placeholder.webp";
  const brandName = brand?.name ?? "";

  const onDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    removeMealFoodItem(mealFoodItemId);
  };
  return (
    <li>
      <img className=" row-span-2 aspect-square h-full rounded" src={img} />
      <h3 className=" truncate">{foodItemName}</h3>
      <p className=" truncate">{brandName}</p>

      <p>{quantity}</p>
      <Button buttonStyle="warning" onClick={onDelete}>
        {ModelButtonIcon("delete")}
      </Button>
      <GenericModel
        Model={MealFoodItemEditModel}
        modelProps={{ handleMealFoodItem, mealFoodItem }}
        mode="create"
        buttonProps={{
          buttonStyle: "model",
          className: "w-6 h-6",
        }}
        isOverlay={false}
        isPortal={true}
      />
    </li>
  );
}
