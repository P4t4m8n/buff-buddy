import { useQuery } from "@tanstack/react-query";

import type { THttpResponse } from "../../models/apiService.model";

interface IUseQueryProps<T, F> {
  queryKey: (string | F | null | undefined)[];
  enabled?: boolean;
  queryFn: () => Promise<THttpResponse<T[]>>;
}

export const useQueryHook = <T extends object, F extends object>({
  queryKey,
  queryFn,
  enabled,
}: IUseQueryProps<T, F>) => {
  return useQuery({
    queryKey: queryKey,
    queryFn,
    enabled,
    staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry:false
  });
};
