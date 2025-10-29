import { useParams } from "react-router";

import MealEdit from "../../components/Meal/MealEdit/MealEdit";
import PageHeader from "../../components/UI/PageHeader";

export default function MealEditPage() {
  const { mealId: mealIdParams } = useParams<{ mealId: string }>();
  const isUpdate = !mealIdParams?.startsWith("temp");

  return (
    <div className="h-main grid grid-rows-[3.5rem_calc(100%-4rem)] gap-2">
      <PageHeader pageName={`  ${isUpdate ? "Edit" : "Create"} Meal`} />
      <MealEdit mealIdParams={mealIdParams} />;
    </div>
  );
}
