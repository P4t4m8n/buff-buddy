//Services
import { muscleService } from "../../../services/muscle.service";
//Hooks
import { useQueryHook } from "../../queryHooks/useQueryHook";
//Consts
import { QUERY_KEYS } from "../../../consts/queryKeys.consts";
//Types
import type {
  IMuscleFilter,
  IMuscleDTO,
} from "../../../../../shared/models/muscle.model";

export const useMusclesQuery = (filter: IMuscleFilter | null) => {
  return useQueryHook<IMuscleDTO, IMuscleFilter>({
    queryKey: [QUERY_KEYS.MUSCLES_QUERY_KEY, filter],
    queryFn: () => muscleService.get(filter),
    enabled: !!filter,
  });
};
