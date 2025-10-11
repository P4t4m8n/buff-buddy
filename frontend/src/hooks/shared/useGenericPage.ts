//Lib
import { useSearchParams } from "react-router";
import { useEffect, useMemo } from "react";
//Hooks
import { useErrors } from "./useErrors";
import { useMutationKeyStore } from "../../store/mutationKeys.store";
import { useItemDeleteMutation } from "../queryHooks/useItemDeleteMutation";
//Types
import type { THttpResponse } from "../../models/apiService.model";
import type { TStoreKeys } from "../../models/mutationKeyStore.model";
import type { IBaseFilter } from "../../../../shared/models/app.model";

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
  const listKey = useMutationKeyStore((store) => store[mutationKeyName]);

  useEffect(() => {
    setMutationKey(mutationKeyName, [queryKey, filter]);
  }, [filter, queryKey, mutationKeyName, setMutationKey]);

  const { data, isLoading, error: queryError } = useQuery(filter);
  const { data: items, meta } = data ?? {};

  const {
    mutateAsync,
    isPending: isDeleting,
    error: deleteError,
  } = useItemDeleteMutation({
    listKey,
    itemIdKey,
    removeFn,
  });

  const { handleError } = useErrors();

  useEffect(() => {
    if (queryError) handleError({ error: queryError, emitToToast: true });
  }, [queryError]);

  useEffect(() => {
    if (deleteError) handleError({ error: deleteError, emitToToast: true });
  }, [deleteError]);

  const deleteItem = async (itemId?: string) => {
    try {
      if (!itemId) return;
      await mutateAsync(itemId);
    } catch (error) {
      handleError({ error, emitToToast: true });
    }
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;
    const updatedParams: Record<string, string> = {};

    Object.keys(initialFilter).forEach((key) => {
      const element = form.elements.namedItem(key) as HTMLInputElement | null;
      if (!element) return;

      let value: string | number | boolean;

      switch (element.type) {
        case "checkbox":
          value = element.checked;
          break;
        case "number":
          value = element.valueAsNumber;
          break;
        default:
          value = element.value;
          break;
      }
      if (value !== "" && value !== null && value !== undefined) {
        updatedParams[key] = String(value);
      }
    });

    if ("skip" in initialFilter) {
      updatedParams.skip = "0";
    }

    setSearchParams(updatedParams, { replace: true });
  };

  const onResetSearchForm = () => {
    const newParams: Record<string, string> = {};
    //INFO: Preserve pagination but reset filters
    for (const [key, value] of searchParams.entries()) {
      if (key === "skip" || key === "take") {
        newParams[key] = value;
      }
    }
    setSearchParams(newParams, { replace: true });
  };

  const onPaginate = (page: number) => {
    const newParams: Record<string, string> = {
      ...(filter as unknown as Record<string, string>),
      skip: page.toString(),
    };

    setSearchParams(newParams, { replace: true });
  };
  return {
    items,
    isLoading,
    isDeleting,
    filter,
    queryError,
    deleteError,
    meta,
    deleteItem,
    onSearch,
    onResetSearchForm,
    onPaginate,
  };
};
