import MealList from "../../components/Meal/MealList/MealList";

import PageHeader from "../../components/UI/PageHeader";
import { MEAL_ROUTES } from "../../consts/routes.const";
import PageList from "../../components/UI/PageList";

export default function MealPage() {
  return (
    <PageList
      header={
        <PageHeader pageName="meal" editLink={MEAL_ROUTES.MEAL_EDIT_ROUTE} />
      }
    >
      <MealList actionType="mealList" />
    </PageList>
  );
}
