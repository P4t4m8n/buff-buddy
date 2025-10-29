//Lib
import { useEffect } from "react";
//Hooks
import { useErrors } from "./useErrors";
//Types
import type { THttpResponse } from "../../models/apiService.model";
import type { UseQueryResult } from "@tanstack/react-query";

interface IUseItemDetailsProps<DTO> {
  useIdQuery: (id?: string) => UseQueryResult<THttpResponse<DTO | null>, Error>;
  itemId?: string;
}

const useItemDetails = <DTO,>({
  useIdQuery,
  itemId,
}: IUseItemDetailsProps<DTO>) => {
  const { data, isLoading, error: queryError } = useIdQuery(itemId);

  const item = data?.data;

  const { handleError } = useErrors();

  useEffect(() => {
    if (queryError) handleError({ error: queryError, emitToToast: true });
  }, [queryError]);

  return { item, isLoading };
};

export default useItemDetails;
