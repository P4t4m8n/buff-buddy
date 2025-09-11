import { useParams } from "react-router";
import FoodItemEdit from "../../components/FoodItem/FoodItemEdit/FoodItemEdit";

export default function FoodItemEditPage() {
  const { foodItemId } = useParams<{ foodItemId?: string }>();
  return <FoodItemEdit foodItemId={foodItemId} />;
}
