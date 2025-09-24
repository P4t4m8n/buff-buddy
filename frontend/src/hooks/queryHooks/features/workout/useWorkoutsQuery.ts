import { useQueryHook } from "../../useQueryHook";

import { QUERY_KEYS } from "../../../../consts/queryKeys.consts";

import { workoutService } from "../../../../services/workout.service";

import type {
  IWorkoutDTO,
  IWorkoutFilter,
} from "../../../../../../shared/models/workout.model";

export const useWorkoutsQuery = (filter: IWorkoutFilter | null) => {
  return useQueryHook<IWorkoutDTO, IWorkoutFilter>({
    queryKey: [QUERY_KEYS.WORKOUTS_QUERY_KEY, filter],
    queryFn: () => workoutService.get(filter),
    enabled: !!filter,
  });
};
