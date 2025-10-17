import { QUERY_KEYS } from "../../../consts/queryKeys.consts";
import { mealService } from "../../../services/meal.service";
import useQueryIdHook from "../../queryHooks/useQueryIdHook";

export default function useMealIdQuery(id?: string) {
  return useQueryIdHook({
    id,
    queryKey: QUERY_KEYS.MEAL_ID_QUERY_KEY,
    queryFn: mealService.getById,
  });
}
