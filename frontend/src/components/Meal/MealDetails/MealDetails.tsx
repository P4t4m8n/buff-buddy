//Hooks
import useMealIdQuery from "../../../hooks/features/meal/useMealIdQuery";
import useItemDetails from "../../../hooks/shared/useItemDetails";
import usePageId from "../../../hooks/shared/usePageIdContext";
//Utils
import toTitle from "../../../utils/toTitle";
//Components
import MealNutritionDetails from "../MealNutritionDetails/MealNutritionDetails";
import MealFoodItemDetailsListItem from "./MealFoodItemDetailsListItem";
//UI
import GenericList from "../../UI/GenericList";
import Loader from "../../UI/loader/Loader";

export default function MealDetails() {
  const id = usePageId();
  const { item: meal, isLoading } = useItemDetails({
    itemId: id,
    useIdQuery: useMealIdQuery,
  });

  if (isLoading) {
    return <Loader loaderType="screen" isFullScreen={false} />;
  }

  if (!meal) {
    return <div>No meal found</div>;
  }

  const { owner, name, mealType, notes, images, mealFoodItems } = meal;

  const primaryImage = images?.find((img) => img.isPrimary) ?? {
    url: "/images/meal-default.jpg",
  };

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto gap-4">
      <div className="flex pl-desktop h-[40vh] w-full gap-2">
        <div className="w-1/2 flex flex-col gap-8">
          <h2 className="text-3xl pb-2  ">{toTitle(name)}</h2>
          <p
            className="border rounded-4xl px-2 py-1 w-fit 
         bg-main-black text-main-orange "
          >
            {toTitle(mealType ?? "Unknown")}
          </p>
          <MealNutritionDetails
            mealFoodItems={mealFoodItems}
            notes={notes}
            owner={owner}
          />
        </div>
        <div className="min-w-1/2 flex  justify-center">
          <img
            className="max-h-full aspect-square object-cover rounded-l-full md:rounded-full"
            src={primaryImage?.url ?? ""}
            alt={primaryImage?.altText ?? "Meal Image"}
          />
        </div>
      </div>
      <div className="px-2 min-h-[calc(100%-40vh-1rem)]">
        <div className=" bg-black-500 p-4 rounded-t-3xl h-full">
          <h3 className="text-2xl mb-4">Ingredients</h3>
          <GenericList
            items={mealFoodItems}
            ItemComponent={MealFoodItemDetailsListItem}
            getKey={(item) => item.id ?? ""}
            ulStyle="flex flex-col gap-4 "
          />
        </div>
      </div>
    </div>
  );
}
