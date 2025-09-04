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
  console.log("🚀 ~ FoodItemPreview ~ foodItem:", foodItem);

  const { name, images, brand, id: foodItemId } = foodItem;
  const img = images?.[0].url ?? "";
  const brandName = brand?.name ?? "";
  return (
    <li>
      <h3>{name}</h3>
      <p>{brandName}</p>
      <img src={img}></img>
      <div className=" flex items-center gap-3 ">
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
