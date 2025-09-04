import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";
import LinkComponent from "../../components/UI/Link";

export default function MealPage() {
  // const { isPending, isError, data: meals, error } = useMealsQuery();
  // console.log("🚀 ~ MealPage ~ isPending:", isPending);
  // console.log("🚀 ~ MealPage ~ isError:", isError);
  // console.log("🚀 ~ MealPage ~ error:", error);
  // console.log("🚀 ~ MealPage ~ meals:", meals);
  return (
    <div className=" h-main grid grid-stack ">
      <header className="p-mobile md:p-desktop shadow-border-b ">
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
    </div>
  );
}
