import type { IBaseFilter } from "../../../../../../shared/models/app.model";
import type { IMealDTO } from "../../../../../../shared/models/meal.model";
import { mealService } from "../../../../services/meal.service";
import { useQueryHook } from "../../useQueryHook";

export default function useMealsQuery() {
  return useQueryHook<IMealDTO, IBaseFilter>({
    queryKey: ["meals"],
    queryFn: () => mealService.get(),
  });
}
