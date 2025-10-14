import { Outlet } from "react-router";
import LinkComponent from "../../components/UI/Link";
import PageHeader from "../../components/UI/PageHeader";
import {
  DIET_ROUTES,
  FOOD_ITEM_ROUTES,
  MEAL_ROUTES,
} from "../../consts/routes.const";

export default function DietPage() {
  return (
    <div className="h-main w-full grid">
      <section className="grid-stack grid grid-rows-[3.5rem_2.5rem_calc(100%-7rem)] gap-4">
        <PageHeader pageName="Diet" editLink={DIET_ROUTES.DIET_EDIT_ROUTE} />
        <div>
          <LinkComponent
            className="bg-main-orange w-fit mx-4 py-2 px-2 rounded text-black self-center "
            to={MEAL_ROUTES.MEALS_PAGE_ROUTE}
          >
            Meals List
          </LinkComponent>
          <LinkComponent
            className="bg-main-orange w-fit mx-4 py-2 px-2 rounded text-black self-center "
            to={FOOD_ITEM_ROUTES.FOOD_ITEM_PAGE_ROUTE}
          >
            Food Items List
          </LinkComponent>
        </div>
      </section>
      <Outlet />
    </div>
  );
}
