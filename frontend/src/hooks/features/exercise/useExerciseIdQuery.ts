import { QUERY_KEYS } from "../../../consts/queryKeys.consts";
import { exerciseService } from "../../../services/exercise.service";
import useQueryIdHook from "../../queryHooks/useQueryIdHook";

export default function useExerciseIdQuery(id?: string) {
  const { data, isLoading, error } = useQueryIdHook({
    id,
    queryKey: QUERY_KEYS.EXERCISE_ID_QUERY_KEY,
    queryFn: exerciseService.getById,
  });

  return { error, data, isLoading };
}
