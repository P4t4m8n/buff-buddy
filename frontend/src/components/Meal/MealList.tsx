import type {
  IMealDTO,
  IMealFilter,
} from "../../../../shared/models/meal.model";
import useFilterQuery from "../../hooks/queryHooks/useFilterQuery";
import useMealsQuery from "../../hooks/queryHooks/features/meal/useMealsQuery";
import { mealMutationKeyStore } from "../../store/mealMutationKeyStore";
import { formUtil } from "../../utils/form.util";
import GenericList from "../UI/GenericList";
import Loader from "../UI/loader/Loader";
import MealFilter from "./MealFilter";
import MealPreview from "./MealPreview";

const INITIAL_FILTER = {
  skip: 0,
  take: 1000000,
};
export default function MealList() {
  const { setFilter, filter, data, isLoading } = useFilterQuery<
    IMealFilter,
    IMealDTO
  >({
    initialFilter: INITIAL_FILTER,
    useItemQuery: useMealsQuery,
    mutationKeyStore: mealMutationKeyStore,
    baseKey: "meals",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formUtil.handleInputChange<IMealFilter>(e, setFilter);
  };

  return (
    <>
      <MealFilter filter={filter} onChange={onChange} />
      <div className="border-b"></div>
      {isLoading ? (
        <Loader loaderType="screen" isFullScreen={false} />
      ) : (
        <GenericList
          items={[...(data ?? [])]}
          ItemComponent={MealPreview}
          getKey={(item) => item?.id ?? ""}
          ulStyle="flex flex-col gap-4 overflow-y-auto "
        />
      )}
    </>
  );
}
