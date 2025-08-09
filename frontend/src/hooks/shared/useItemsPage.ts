import type { StoreApi, UseBoundStore } from "zustand";
import { useErrors } from "./useErrors";
import { useCallback, useEffect } from "react";
import { ClientError } from "../../services/ClientError.service";
import type { ILoadItemsStore } from "../../models/store.model";

interface IUseItemsPageProps<T, F> {
  useStore: UseBoundStore<StoreApi<ILoadItemsStore<T, F>>>;
}

//TODO?? Add filtering and searching capabilities
export const useItemsPage = <T, F>({ useStore }: IUseItemsPageProps<T, F>) => {
  const items = useStore((state) => state.items);
  const isLoading = useStore((state) => state.isLoading);
  const loadItems = useStore((state) => state.loadItems);
  const deleteItem = useStore((state) => state.deleteItem);

  const { clearErrors, handleError } = useErrors();

  useEffect(() => {
    const init = async () => {
      try {
        clearErrors();
        await loadItems();
      } catch (error) {
        const emitToToast = true;
        handleError(error, emitToToast);
      }
    };
    init();
  }, []);

  const onDeleteItem = useCallback(async (id?: string) => {
    try {
      if (!id) {
        throw ClientError.create("ID is required for deletion.");
      }
      await deleteItem(id);
    } catch (error) {
      const emitToToast = true;
      handleError(error, emitToToast);
    }
  }, []);

  return { items, isLoading, onDeleteItem };
};
