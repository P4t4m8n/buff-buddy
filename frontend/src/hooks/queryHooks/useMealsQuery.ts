import useQueryHook from "./useQueryHook";
import { mealService } from "../../services/meal.service";
import type { IMealDTO } from "../../../../shared/models/meal.model";
import type { IBaseFilter } from "../../../../shared/models/app.model";

export default function useMealsQuery() {
  return useQueryHook<IMealDTO,IBaseFilter>({
    queryKey: ["meals"],
    queryFn: () => mealService.get(),
  });
}
