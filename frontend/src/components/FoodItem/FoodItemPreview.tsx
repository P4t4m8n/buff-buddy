import type { IFoodItemDto } from "../../../../shared/models/foodItem.model";
import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";
import Button from "../UI/Button";
import GenericModel from "../UI/GenericModel";
import LinkComponent from "../UI/Link";
import FoodItemEdit from "./FoodItemEdit/FoodItemEdit";

interface IFoodItemPreviewProps {
  item: IFoodItemDto;
  onSelectFoodItem?: (e: React.MouseEvent, foodItem: IFoodItemDto) => void;
  isSelect?: boolean;
}

export default function FoodItemPreview({
  item: foodItem,
  onSelectFoodItem,
  isSelect = true
}: IFoodItemPreviewProps) {
  const { name, images, brand, id: foodItemId } = foodItem;

  const img = images?.[0]?.url ?? "/images/placeholder.webp";
  const brandName = brand?.name ?? "";

  const buttonText = isSelect? "Select":"Un-select"
  return (
    <li className="grid grid-cols-[3rem_calc(100%-3.5rem)] grid-rows-[1.5rem_1.5rem_auto] gap-x-2 bg-black-300 p-2 rounded">
      <img className=" row-span-2 aspect-square h-full rounded" src={img} />
      <h3 className=" truncate">{name}</h3>
      <p className=" truncate">{brandName}</p>
      <div className=" flex items-center gap-3 col-span-2 pt-4 ">
        <LinkComponent to={`${foodItemId}`} className="mr-auto">
          <Button buttonStyle="model">{ModelButtonIcon("details")}</Button>
        </LinkComponent>
        <GenericModel
          isOverlay={true}
          Model={FoodItemEdit}
          modelProps={{ foodItemId }}
          buttonProps={{ buttonStyle: "model" }}
          mode="edit"
        />
        <Button
          buttonStyle="save"
          className="w-fit px-2"
          onClick={(e) => !!onSelectFoodItem && onSelectFoodItem(e, foodItem)}
        >
         {buttonText}
        </Button>
      </div>
    </li>
  );
}
