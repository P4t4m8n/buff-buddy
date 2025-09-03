import type { IFoodItemDto } from "../../../../shared/models/foodItem.model";

interface IFoodItemPreviewProps {
  item: IFoodItemDto;
}

export default function FoodItemPreview({
  item: foodItem,
}: IFoodItemPreviewProps) {
  console.log("🚀 ~ FoodItemPreview ~ foodItem:", foodItem);
  return <li>{foodItem.name}</li>;
}
