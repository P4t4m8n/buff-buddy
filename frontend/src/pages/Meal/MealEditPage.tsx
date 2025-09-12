import { useParams } from "react-router";

import MealEdit from "../../components/Meal/MealEdit/MealEdit";

export default function MealEditPage() {
  const { mealId: mealIdParams } = useParams<{ mealId: string }>();

  return <MealEdit mealIdParams={mealIdParams} />;
}
