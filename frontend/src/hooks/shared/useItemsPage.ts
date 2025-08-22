import type { StoreApi, UseBoundStore } from "zustand";
import { useErrors } from "./useErrors";
import { useCallback, useEffect, useState } from "react";
import { ClientError } from "../../services/ClientError.service";
import type { ILoadItemsStore } from "../../models/store.model";

interface IUseItemsPageProps<T, F> {
  useStore: UseBoundStore<StoreApi<ILoadItemsStore<T, F>>>;
  initialFilter: F;
}

//TODO?? Add filtering and searching capabilities
export const useItemsPage = <T, F>({
  useStore,
  initialFilter,
}: IUseItemsPageProps<T, F>) => {
  const [filter, setFilter] = useState<F>(initialFilter);
  const items = useStore((state) => state.items);
  const isLoading = useStore((state) => state.isLoading);
  const loadItems = useStore((state) => state.loadItems);
  const deleteItem = useStore((state) => state.deleteItem);

  const { clearErrors, handleError } = useErrors();

  useEffect(() => {
    const init = async () => {
      try {
        clearErrors();
        await loadItems(filter);
      } catch (error) {
        handleError({ error, emitToToast: true });
      }
    };
    init();
  }, [filter]);

  const onDeleteItem = useCallback(async (id?: string) => {
    try {
      if (!id) {
        throw ClientError.create("ID is required for deletion.");
      }
      await deleteItem(id);
    } catch (error) {
      handleError({ error, emitToToast: true });
    }
  }, []);

  return { items, isLoading, filter, setFilter, onDeleteItem };
};
