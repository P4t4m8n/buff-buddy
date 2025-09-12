import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";

import MealList from "../../components/Meal/MealList";

import LinkComponent from "../../components/UI/Link";

export default function MealPage() {
  return (
    <div className=" h-main flex flex-col gap-4 ">
      <header className="p-mobile shadow-border-b">
        <span className="text-center">
          <h2 className="text-3xl font-bold text-main-black ">Your Meals</h2>
          <p className="text-gray-300 text-lg">
            Manage, edit, or create new meals to reach your goals!
          </p>
        </span>
        <LinkComponent linkStyle="model" className="w-fit" to={"edit"}>
          {ModelButtonIcon("edit")}
        </LinkComponent>
      </header>
      <div className="p-mobile grid gap-4 overflow-y-auto">
        <MealList />
      </div>
    </div>
  );
}
