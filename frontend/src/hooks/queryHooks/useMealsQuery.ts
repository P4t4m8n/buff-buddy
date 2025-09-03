import useQueryHook from "./useQueryHook";
import { mealService } from "../../services/meal.service";
import type { IMealDTO } from "../../../../shared/models/meal.model";

export default function useMealsQuery() {
  return useQueryHook<IMealDTO>({
    queryKey: ["meals"],
    queryFn: () => mealService.get(),
  });
}
