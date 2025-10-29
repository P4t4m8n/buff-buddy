//Components
import FoodItemEdit from "./FoodItemEdit/FoodItemEdit";
//UI
import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";
import Button from "../UI/Button";
import GenericModel from "../UI/GenericModel";
import LinkComponent from "../UI/Link";
//Types
import type { IFoodItemDTO } from "../../../../shared/models/foodItem.model";

interface IFoodItemPreviewProps {
  item: IFoodItemDTO;
  onSelectFoodItem?: (e: React.MouseEvent, foodItem: IFoodItemDTO) => void;
  isSelect?: boolean;
}

export default function FoodItemPreview({
  item: foodItem,
  onSelectFoodItem,
  isSelect = true,
}: IFoodItemPreviewProps) {
  const { name, brand, id: foodItemId, images } = foodItem;

  const img = images?.[0]?.url ? images?.[0]?.url : "/images/placeholder.webp";
  const brandName = brand?.name ?? "";

  const buttonText = isSelect ? "Select" : "Un-select";
  return (
    <li className="grid grid-cols-[3.5rem_1fr] grid-rows-[1.5rem_1.5rem_3rem] gap-2 border p-2 rounded">
      <img className=" row-span-2 aspect-square h-full rounded" src={img} />
      <h3 className=" truncate">{name}</h3>
      <p className=" truncate">{brandName}</p>
      <div className=" grid grid-cols-[1fr_auto_auto] gap-3 col-span-full pt-2  ">
        <LinkComponent to={`${foodItemId}`} className="">
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
