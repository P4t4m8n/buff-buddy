import type { IFoodItemDto } from "../../../../shared/models/foodItem.model";
import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";
import Button from "../UI/Button";
import LinkComponent from "../UI/Link";

interface IFoodItemPreviewProps {
  item: IFoodItemDto;
  onSelectFoodItem?: (e: React.MouseEvent, foodItem: IFoodItemDto) => void;
}

export default function FoodItemPreview({
  item: foodItem,
  onSelectFoodItem,
}: IFoodItemPreviewProps) {

  const { name, images, brand, id: foodItemId } = foodItem;

  const img = images?.[0]?.url ?? "/images/placeholder.webp";
  const brandName = brand?.name ?? "";
  return (
    <li className="grid grid-cols-[3rem_calc(100%-3.5rem)] grid-rows-[1.5rem_1.5rem_auto] gap-x-2 bg-black-300 p-2 rounded">
      <img className=" row-span-2 aspect-square h-full rounded"  src={img}/>
      <h3>{name}</h3>
      <p>{brandName}</p>
      <div className=" flex items-center gap-3 col-span-2 pt-4 ">
        <LinkComponent to={`${foodItemId}`} className="mr-auto">
          <Button buttonStyle="model">{ModelButtonIcon("details")}</Button>
        </LinkComponent>
        <LinkComponent to={`edit/${foodItemId}`} className="">
          <Button buttonStyle="model">{ModelButtonIcon("edit")}</Button>
        </LinkComponent>
        <Button
          buttonStyle="save"
          onClick={(e) => !!onSelectFoodItem && onSelectFoodItem(e, foodItem)}
        >
          Select
        </Button>
      </div>
    </li>
  );
}
