import { QUERY_KEYS } from "../../../consts/queryKeys.consts";
import { exerciseService } from "../../../services/exercise.service";
import useQueryIdHook from "../../queryHooks/useQueryIdHook";

export const useExerciseIdQuery = (id?: string) => {
  return useQueryIdHook({
    id,
    queryKey: QUERY_KEYS.EXERCISE_ID_QUERY_KEY,
    queryFn: exerciseService.getById,
  });
};
