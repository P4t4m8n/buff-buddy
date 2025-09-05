import { useQuery } from "@tanstack/react-query";

import { foodItemService } from "../../services/foodItems.service";

import { useErrors } from "../shared/useErrors";

import type { IFoodItemDto } from "../../../../shared/models/foodItem.model";

export default function useFoodItemIdQuery(id?: string) {
  const { handleError } = useErrors<IFoodItemDto>();
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
