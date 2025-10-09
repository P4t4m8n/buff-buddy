import type { UseQueryResult } from "@tanstack/react-query";
import type { THttpResponse } from "../../../models/apiService.model";
import { useErrors } from "../../shared/useErrors";
import { useEffect } from "react";

interface IUseExerciseInfoListProps<DTO, Filter> {
  queryHook(
    filter?: Filter | null
  ): UseQueryResult<THttpResponse<DTO[]>, Error>;
  filter?: Filter | null;
}
export const useExerciseInfoList = <DTO, Filter>({
  queryHook,
  filter,
}: IUseExerciseInfoListProps<DTO, Filter>) => {
  const { data, isLoading, error } = queryHook(filter);
  const { handleError } = useErrors();

  useEffect(() => {
    if (error) handleError({ error, emitToToast: true });
  }, [error]);

  const items = data?.data??[];

  return { items, isLoading };
};
