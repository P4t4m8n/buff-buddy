//Services
import { exerciseService } from "../../services/exercise.service";
//Hooks
import { useGenericPage } from "../../hooks/shared/useGenericPage";
import { useExercisesQuery } from "../../hooks/features/exercise/useExerciseQuery";
//Context
import { IsDeletingContext } from "../../hooks/context/IsDeletingContext";
//Consts
import { QUERY_KEYS } from "../../consts/queryKeys.consts";
import { initialFilters } from "../../consts/filters.consts";
//Components
import ExercisePreview from "./ExercisePreview";
import ExerciseFilter from "./ExerciseFilter";
//UI
import GenericList from "../UI/GenericList";
import Loader from "../UI/loader/Loader";
import Pagination from "../UI/Pagination";
import NoListItems from "../UI/NoListItems";
//Types
import type {
  IExerciseDTO,
  IExerciseFilter,
} from "../../../../shared/models/exercise.model";
import type { TExerciseActionRoute } from "../../models/exercise.model";

interface IExerciseListProps {
  selectExercise?: (exercise?: IExerciseDTO) => void;
  actionType?: TExerciseActionRoute;
}

export default function ExerciseList({
  selectExercise,
  actionType = "exerciseList",
}: IExerciseListProps) {
  const {
    items = [],
    isLoading,
    isDeleting,
    meta,
    filter,
    deleteItem,
    onSearch,
    onResetSearchForm,
    onPaginate,
  } = useGenericPage<IExerciseDTO, IExerciseFilter>({
    initialFilter: initialFilters.INITIAL_EXERCISE_FILTER,
    queryKey: QUERY_KEYS.EXERCISES_QUERY_KEY,
    mutationKeyName: QUERY_KEYS.EXERCISE_MUTATION_KEY,
    itemIdKey: QUERY_KEYS.EXERCISE_ID_QUERY_KEY,
    useQuery: useExercisesQuery,
    removeFn: exerciseService.remove,
  });
  if (isLoading) {
    return <Loader loaderType="cards-pulse" isFullScreen={false} />;
  }

  return (
    <IsDeletingContext value={isDeleting}>
      <>
        <ExerciseFilter
          exerciseFilter={filter}
          isLoading={isLoading}
          onSearch={onSearch}
          onResetForm={onResetSearchForm}
        />
        <GenericList
          items={items}
          ItemComponent={ExercisePreview}
          itemComponentProps={{ deleteItem, selectExercise, actionType }}
          NoItemsComponent={NoItemsComponent}
          getKey={(item) => item.id!}
          ulStyle="gap-4 h-full overflow-y-auto px-desktop w-full 
                     grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]
                     grid-rows-[repeat(auto-fill,14rem)]"
        />
        <Pagination meta={meta} onPaginate={onPaginate} />
      </>
    </IsDeletingContext>
  );
}

const NoItemsComponent = () => {
  return (
    <NoListItems
      heading="No exercises found"
      paragraph="Create your first exercise to get started!"
    />
  );
};
