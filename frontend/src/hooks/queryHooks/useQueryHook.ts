import { useQuery } from "@tanstack/react-query";
import { useErrors } from "../shared/useErrors";

interface IUseQueryProps<T, F> {
  queryKey: string[];
  filter?: F;
  enabled?: boolean;
  queryFn: () => Promise<T[]>;
}

export default function useQueryHook<T extends object, F extends object>({
  queryKey,
  queryFn,
  filter,
  enabled,
}: IUseQueryProps<T, F>) {
  const { handleError } = useErrors<T>();
  const { isPending, isError, data, error } = useQuery({
    queryKey: [...queryKey, filter],
    queryFn,
    enabled,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    throwOnError: (error, query) => {
      console.log("🚀 ~ useQueryHook ~ query:", query);
      handleError({ error });
      return true;
    },
  });
  return { isPending, isError, data, error };
}
