import type {
  IFoodItemInfoDTO,
  IFoodItemInfoFilter,
} from "../../../../../shared/models/foodItem.model";
import { QUERY_KEYS } from "../../../consts/queryKeys.consts";
import { foodItemService } from "../../../services/foodItems.service";
import { useQueryHook } from "../../queryHooks/useQueryHook";

export const useFoodItemBrandsQuery = (filter: IFoodItemInfoFilter | null) => {
  return useQueryHook<IFoodItemInfoDTO, IFoodItemInfoFilter>({
    queryKey: [QUERY_KEYS.FOOD_ITEM_BRANDS_QUERY_KEY, filter],
    queryFn: () => foodItemService.getFoodItemInfo(filter, "brand"),
    enabled: !!filter,
  });
};
