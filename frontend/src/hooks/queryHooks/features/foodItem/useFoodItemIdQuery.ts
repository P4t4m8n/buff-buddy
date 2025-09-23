import { useQuery } from "@tanstack/react-query";
import { useErrors } from "../../../shared/useErrors";
import type { IFoodItemDTO } from "../../../../../../shared/models/foodItem.model";
import { foodItemService } from "../../../../services/foodItems.service";

export default function useFoodItemIdQuery(id?: string) {
  const { handleError } = useErrors<IFoodItemDTO>();
  const { data, isLoading } = useQuery({
    queryKey: ["foodItemId", id],
    queryFn: () => foodItemService.getById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    throwOnError: (error, _) => {
      handleError({ error });
      return true;
    },
  });
  return { data, isLoading };
}
