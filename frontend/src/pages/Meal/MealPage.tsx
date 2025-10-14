
import MealList from "../../components/Meal/MealList";

import PageHeader from "../../components/UI/PageHeader";
import { MEAL_ROUTES } from "../../consts/routes.const";

export default function MealPage() {
  return (
    <div className=" h-main grid-stack flex flex-col gap-4 z-10 bg-black-900">
      <PageHeader pageName="meal" editLink={MEAL_ROUTES.MEAL_EDIT_ROUTE} />

      <div className="p-mobile grid gap-4 overflow-y-auto">
        <MealList actionType="mealList" />
      </div>
    </div>
  );
}
