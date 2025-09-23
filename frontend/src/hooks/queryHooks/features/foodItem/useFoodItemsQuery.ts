import type {
  IFoodItemDTO,
  IFoodItemFilter,
} from "../../../../../../shared/models/foodItem.model";
import { foodItemService } from "../../../../services/foodItems.service";
import { useQueryHook } from "../../useQueryHook";

export default function useFoodItemsQuery(filter: IFoodItemFilter) {
  return useQueryHook<IFoodItemDTO, IFoodItemFilter>({
    queryKey: ["foodItems", filter],
    queryFn: () => foodItemService.get(filter),
    enabled: !!filter.barcode || !!filter.name,
  });
}
