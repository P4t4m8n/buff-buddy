//Services
import { foodItemService } from "../../../services/foodItems.service";
//Hooks
import useQueryIdHook from "../../queryHooks/useQueryIdHook";
//Consts
import { QUERY_KEYS } from "../../../consts/queryKeys.consts";

export const useFoodItemIdQuery = (id?: string) => {
  return useQueryIdHook({
    id,
    queryKey: QUERY_KEYS.FOOD_ITEM_ID_QUERY_KEY,
    queryFn: foodItemService.getById,
  });
};
