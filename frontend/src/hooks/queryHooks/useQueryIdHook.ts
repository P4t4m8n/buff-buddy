import { useErrors } from "../shared/useErrors";
import { useQuery } from "@tanstack/react-query";

interface IUseQueryIdHookProps<T> {
  id?: string;
  queryFn: (id?: string) => Promise<T>;
  queryKey?: string;
}

export default function useQueryIdHook<T extends object>({
  id,
  queryFn,
  queryKey,
}: IUseQueryIdHookProps<T>) {
  const { handleError } = useErrors<T>();
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: () => queryFn(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    throwOnError: (error, _) => {
      handleError({ error, emitToToast: true });
      return true;
    },
  });
}
