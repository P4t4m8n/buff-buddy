import { useQuery } from "@tanstack/react-query";
import { useErrors } from "../shared/useErrors";

interface IUseQueryProps<T, F> {
  queryKey: (string | F | null | undefined)[];

  enabled?: boolean;
  queryFn: () => Promise<T[]>;
}

export const useQueryHook = <T extends object, F extends object>({
  queryKey,
  queryFn,
  enabled,
}: IUseQueryProps<T, F>) => {
  const { handleError } = useErrors<T>();
  const { isPending, isError, data, error, status, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn,
    enabled,
    staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    throwOnError: (error, _) => {
      handleError({ error });
      return true;
    },
  });
  return { isPending, isError, data, error, status, isLoading };
};
