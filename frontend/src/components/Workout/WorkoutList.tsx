//Lib
import { useCallback, useMemo } from "react";
//Services
import { workoutService } from "../../services/workout.service";
//Hooks
import { useWorkoutsQuery } from "../../hooks/features/workout/useWorkoutsQuery";
import { useGenericPage } from "../../hooks/shared/useGenericPage";
//Consts
import { INITIAL_FILTERS } from "../../consts/filters.consts";
import { QUERY_KEYS } from "../../consts/queryKeys.consts";
//Components
import WorkoutFilter from "./WorkoutFilter";
import WorkoutPreview from "./WorkoutPreview";
//UI
import GenericList from "../UI/GenericList";
import Loader from "../UI/loader/Loader";
import Pagination from "../UI/Pagination";
//Types
import type { TWorkoutActionRoute } from "../../models/workout.model";
import type {
  IWorkoutDTO,
  IWorkoutFilter,
} from "../../../../shared/models/workout.model";

interface IWorkoutListProps {
  actionType: TWorkoutActionRoute;
  selectedWorkoutId?: string;
  onSelectProgramWorkout?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    workout?: IWorkoutDTO,
    isCopy?: boolean
  ) => void;
}

export default function WorkoutList({
  actionType,
  selectedWorkoutId,
  onSelectProgramWorkout,
}: IWorkoutListProps) {
  const {
    items = [],
    isLoading,
    isDeleting,
    filter,
    meta,
    deleteItem: deleteWorkout,
    onSearch,
    onResetSearchForm,
    onPaginate,
  } = useGenericPage<IWorkoutDTO, IWorkoutFilter>({
    initialFilter: INITIAL_FILTERS.INITIAL_WORKOUT_FILTER,
    queryKey: QUERY_KEYS.WORKOUTS_QUERY_KEY,
    mutationKeyName: QUERY_KEYS.WORKOUT_MUTATION_KEY,
    itemIdKey: QUERY_KEYS.WORKOUT_ID_QUERY_KEY,
    useQuery: useWorkoutsQuery,
    removeFn: workoutService.remove,
  });

  const itemComponentProps = useMemo(() => {
    return actionType === "programEdit"
      ? {
          actionType: "programEdit" as TWorkoutActionRoute,
          onSelectProgramWorkout,
        }
      : {
          actionType: "workoutList" as TWorkoutActionRoute,
          onDeleteWorkout: deleteWorkout,
          isDeleting,
        };
  }, []);

  const getKey = useCallback((item: IWorkoutDTO) => item.id ?? "", []);

  const workouts = !selectedWorkoutId
    ? items
    : items.filter((wo) => wo.id !== selectedWorkoutId);

  return (
    <>
      <WorkoutFilter
        workoutsFilter={filter}
        isLoading={isLoading}
        onSearch={onSearch}
        onResetForm={onResetSearchForm}
      />
      {isLoading ? (
        <Loader loaderType="cards-pulse" isFullScreen={false} />
      ) : (
        <>
          <GenericList
            items={workouts}
            ItemComponent={WorkoutPreview}
            itemComponentProps={itemComponentProps}
            getKey={getKey}
            ulStyle="gap-4 h-full overflow-y-auto px-desktop w-full 
                     grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]
                     grid-rows-[repeat(auto-fill,14rem)]"
          />
          <Pagination meta={meta} onPaginate={onPaginate} />
        </>
      )}
    </>
  );
}
