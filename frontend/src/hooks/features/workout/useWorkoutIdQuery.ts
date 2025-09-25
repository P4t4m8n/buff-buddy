import { QUERY_KEYS } from "../../../consts/queryKeys.consts";
import { workoutService } from "../../../services/workout.service";
import useQueryIdHook from "../../queryHooks/useQueryIdHook";

export default function useWorkoutIdQuery(id?: string) {
  const { data, isLoading } = useQueryIdHook({
    id,
    queryKey: QUERY_KEYS.WORKOUT_ID_QUERY_KEY,
    queryFn: workoutService.getById,
  });
  return { data, isLoading };
}
