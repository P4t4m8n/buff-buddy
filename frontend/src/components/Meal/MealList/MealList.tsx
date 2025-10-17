import type {
  IMealDTO,
  IMealFilter,
} from "../../../../../shared/models/meal.model";
import { INITIAL_FILTERS } from "../../../consts/filters.consts";
import { QUERY_KEYS } from "../../../consts/queryKeys.consts";
import { IsDeletingContext } from "../../../hooks/context/IsDeletingContext";
import { useMealsQuery } from "../../../hooks/features/meal/useMealsQuery";
import { useGenericPage } from "../../../hooks/shared/useGenericPage";
import type { TMealActionRoute } from "../../../models/meal.model";
import { mealService } from "../../../services/meal.service";
import GenericList from "../../UI/GenericList";
import Loader from "../../UI/loader/Loader";
import Pagination from "../../UI/Pagination";
import MealFilter from "./MealFilter";
import MealPreview from "../MealPreview/MealPreview";
import { useCallback, useMemo } from "react";

interface IWorkoutListProps {
  actionType: TMealActionRoute;
  selectedMealId?: string;
  onSelectDietMeal?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    workout?: IMealDTO,
    isCopy?: boolean
  ) => void;
}

export default function MealList({
  actionType,
  selectedMealId,
  onSelectDietMeal,
}: IWorkoutListProps) {
  const {
    items = [],
    isLoading,
    isDeleting,
    filter,
    meta,
    deleteItem: deleteMeal,
    onSearch,
    onResetSearchForm,
    onPaginate,
  } = useGenericPage<IMealDTO, IMealFilter>({
    initialFilter: INITIAL_FILTERS.INITIAL_MEAL_FILTER,
    queryKey: QUERY_KEYS.MEALS_QUERY_KEY,
    mutationKeyName: QUERY_KEYS.MEAL_MUTATION_KEY,
    itemIdKey: QUERY_KEYS.MEAL_ID_QUERY_KEY,
    useQuery: useMealsQuery,
    removeFn: mealService.remove,
  });
  console.log("🚀 ~ MealList ~ items:", items);

  const itemComponentProps = useMemo(() => {
    return actionType === "dietEdit"
      ? {
          actionType: "dietEdit" as TMealActionRoute,
          onSelectDietMeal,
        }
      : {
          actionType: "mealList" as TMealActionRoute,
          deleteItem: deleteMeal,
          isDeleting,
        };
  }, []);

  const getKey = useCallback((item: IMealDTO) => item.id ?? "", []);

  const meals = !selectedMealId
    ? items
    : items.filter((wo) => wo.id !== selectedMealId);

  return (
    <>
      <IsDeletingContext value={isDeleting}>
        <MealFilter
          mealFilter={filter}
          onSearch={onSearch}
          isLoading={isLoading}
          onResetForm={onResetSearchForm}
        />
        {isLoading ? (
          <Loader loaderType="cards-pulse" isFullScreen={false} />
        ) : (
          <>
            <GenericList
              items={meals ?? []}
              ItemComponent={MealPreview}
              itemComponentProps={itemComponentProps}
              getKey={getKey}
              ulStyle="gap-4 h-full overflow-y-auto px-desktop w-full 
                             grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]
                             grid-rows-[repeat(auto-fill,13rem)]"
            />
            <Pagination meta={meta} onPaginate={onPaginate} />
          </>
        )}
      </IsDeletingContext>
    </>
  );
}
