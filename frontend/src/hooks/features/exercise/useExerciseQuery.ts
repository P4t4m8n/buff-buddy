import { exerciseService } from "../../../services/exercise.service";
import { useQueryHook } from "../../queryHooks/useQueryHook";

import type {
  IExerciseDTO,
  IExerciseFilter,
} from "../../../../../shared/models/exercise.model";
import { QUERY_KEYS } from "../../../consts/queryKeys.consts";

export const useExercisesQuery = (filter: IExerciseFilter | null) => {
  return useQueryHook<IExerciseDTO, IExerciseFilter>({
    queryKey: [QUERY_KEYS.EXERCISES_QUERY_KEY, filter],
    queryFn: () => exerciseService.get(filter),
    enabled: !!filter,
  });
};
