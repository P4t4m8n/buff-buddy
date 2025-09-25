//-Core
import { useSearchParams } from "react-router";
//-Types
import type { THttpResponse } from "../../models/apiService.model";
import { useMutationKeyStore } from "../../store/mutationKeys.store";
import { useEffect, useMemo } from "react";
import { useItemDeleteMutation } from "../queryHooks/useItemDeleteMutation";
import type { TStoreKeys } from "../../models/mutationKeyStore.model";
import type { IBaseFilter } from "../../../../shared/models/app.model";
import { useErrors } from "./useErrors";

interface IUseGenericPageLogicProps<DTO, Filter> {
  initialFilter: Filter;
  queryKey: string;
  mutationKeyName: TStoreKeys;
  itemIdKey: string;
  useQuery: (filter: Filter) => {
    data?: THttpResponse<DTO[]>;
    isLoading: boolean;
    error: Error | null;
  };
  removeFn?: (id?: string) => Promise<THttpResponse<void>>;
}

export const useGenericPage = <DTO, Filter extends IBaseFilter>({
  initialFilter,
  queryKey,
  mutationKeyName,
  itemIdKey,
  useQuery,
  removeFn,
}: IUseGenericPageLogicProps<DTO, Filter>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = useMemo(() => {
    const result: Record<string, any> = { ...initialFilter };
    Object.keys(initialFilter).forEach((key) => {
      const value = searchParams.get(key) ?? initialFilter[key as keyof Filter];

      result[key] = typeof value === "number" ? +value : value;
    });
    return result as Filter;
  }, [searchParams, initialFilter]);

  const setMutationKey = useMutationKeyStore((store) => store.setMutationKey);
  const key = useMutationKeyStore((store) => store[mutationKeyName]);

  useEffect(() => {
    setMutationKey(mutationKeyName, [queryKey, filter]);
  }, [filter, queryKey, mutationKeyName, setMutationKey]);

  const { data, isLoading, error: queryError } = useQuery(filter);
  const { data: items } = data ?? {};

  const {
    mutateAsync,
    isPending,
    error: deleteError,
  } = useItemDeleteMutation({
    listKey: key,
    itemIdKey: itemIdKey,
    removeFn,
  });

  const { handleError } = useErrors();

  const deleteItem = async (itemId?: string) => {
    try {
      if (!itemId) return;
      await mutateAsync(itemId);
    } catch (error) {
      handleError({ error, emitToToast: true });
    }
  };

  useEffect(() => {
    if (queryError) handleError({ error: queryError, emitToToast: true });
  }, [queryError]);

  useEffect(() => {
    if (deleteError) handleError({ error: deleteError, emitToToast: true });
  }, [deleteError]);

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedParams: Record<string, string> = {};

    Object.keys(initialFilter).forEach((key) => {
      const value = formData.get(key) as string;
      updatedParams[key] = value || "";
    });

    if ("skip" in updatedParams) {
      updatedParams.skip = "0";
    }

    setSearchParams(updatedParams);
  };

  return {
    items,
    isLoading,
    isPending,
    filter,
    queryError,
    deleteError,
    deleteItem,
    onSearch,
  };
};
