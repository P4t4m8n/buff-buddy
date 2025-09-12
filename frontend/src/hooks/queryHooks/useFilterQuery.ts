import { useEffect, useState } from "react";

import { useDebounceValue } from "../shared/useDebounce";

import type { StoreApi, UseBoundStore } from "zustand";
import type { IItemMutationKeyStore } from "../../models/store.model";

interface IUseFilterQueryProps<F, T> {
  useItemQuery: (filter: F) => { data?: T[]; isLoading: boolean };
  initialFilter: F;
  mutationKeyStore: UseBoundStore<StoreApi<IItemMutationKeyStore<F>>>;
  debounceDelay?: number;
  baseKey: string;
}
export default function useFilterQuery<F, T>({
  useItemQuery,
  initialFilter,
  mutationKeyStore,
  baseKey,
  debounceDelay = 500,
}: IUseFilterQueryProps<F, T>) {
  const [filter, setFilter] = useState<F | null>(initialFilter);
  const debouncedFilter = useDebounceValue({
    value: filter,
    delay: debounceDelay,
  });

  const { data, isLoading } = useItemQuery(debouncedFilter!);
  const setMutationKey = mutationKeyStore((store) => store.setMutationKey);

  useEffect(() => {
    setMutationKey([baseKey, debouncedFilter]);
  }, [debouncedFilter]);

  return { setFilter, filter, data, isLoading };
}
