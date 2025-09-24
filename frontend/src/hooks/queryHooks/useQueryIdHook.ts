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
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: () => queryFn(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
