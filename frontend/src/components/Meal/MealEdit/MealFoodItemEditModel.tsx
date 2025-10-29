//Hooks
import useMealFoodItemEdit from "../../../hooks/features/meal/useMealFoodItemEdit";
//Components
import FoodItemsList from "../../FoodItem/FoodItemsList";
import FoodItemPreview from "../../FoodItem/FoodItemPreview";
//UI
import NumberInputWIthError from "../../UI/Form/NumberInputWIthError";
import Loader from "../../UI/loader/Loader";
import Button from "../../UI/Button";
import IconArrow from "../../UI/Icons/IconArrow";
//Utils
import { formUtil } from "../../../utils/form.util";
//Types
import type { IModelProps } from "../../../models/model.model";
import type { IFoodItemDTO } from "../../../../../shared/models/foodItem.model";
import type { IUseMealFoodItemEditProps } from "../../../models/meal.model";

interface IMealFoodItemsEditProps
  extends IModelProps<HTMLDivElement>,
    IUseMealFoodItemEditProps {}

export default function MealFoodItemEditModel({
  setIsOpen,
  handleModel,
  ...props
}: IMealFoodItemsEditProps) {
  const {
    foodItemToEdit,
    selectFoodItem,
    deselectFoodItem,
    saveToMeal,
    setFoodItemToEdit,
  } = useMealFoodItemEdit(props);

  if (!foodItemToEdit) {
    return <Loader />;
  }

  const onSelectFoodItem = (e: React.MouseEvent, foodItem: IFoodItemDTO) => {
    e.preventDefault();
    selectFoodItem(foodItem);
  };

  const onDeselectFoodItem = (e: React.MouseEvent, foodItem: IFoodItemDTO) => {
    e.preventDefault();
    deselectFoodItem(foodItem);
  };

  const OnSaveToMeal = (e: React.MouseEvent) => {
    e.preventDefault();
    saveToMeal();
    if (setIsOpen) setIsOpen(false);
  };

  const { id: foodItemToEditId, foodItem, quantity } = foodItemToEdit;

  return (
    <div
      className="bg-black-500 p-4 rounded h-main
                    fixed inset-0 z-40 border text-main-orange"
    >
      <Button
        className="border-main-orange border rounded-full w-10 aspect-auto -rotate-90"
        onClick={handleModel}
      >
        <IconArrow className="w-full aspect-square fill-main-orange" />
      </Button>
      {foodItem ? (
        <div className="flex flex-col gap-4">
          <NumberInputWIthError
            labelText="quantity"
            name="quantity"
            value={quantity || ""}
            inputId={foodItemToEditId}
            onChange={(e) => formUtil.handleInputChange(e, setFoodItemToEdit)}
          />
          <FoodItemPreview
            item={foodItem}
            onSelectFoodItem={onDeselectFoodItem}
            isSelect={false}
          />
          <Button
            buttonStyle="save"
            type="button"
            className="w-full"
            onClick={OnSaveToMeal}
          >
            Save to Meal
          </Button>
        </div>
      ) : (
        <FoodItemsList onSelectFoodItem={onSelectFoodItem} />
      )}
    </div>
  );
}
