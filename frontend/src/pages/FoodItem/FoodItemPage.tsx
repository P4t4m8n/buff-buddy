import { Outlet } from "react-router";
import PageHeader from "../../components/UI/PageHeader";
import { FOOD_ITEM_ROUTES } from "../../consts/routes.const";
import FoodItemsList from "../../components/FoodItem/FoodItemsList";

export default function FoodItemPage() {
  return (
    <div className="h-main grid grid-cols-1 w-full grid-rows-[3.5rem_calc(100%-4rem)] gap-2">
      <PageHeader
        pageName="foodItem"
        editLink={FOOD_ITEM_ROUTES.FOOD_ITEM_EDIT_ROUTE}
      />

      <div className="grid grid-rows-[auto_1fr_3rem]  relative gap-y-4">
        <FoodItemsList />
      </div>
      <Outlet />
    </div>
  );
}
