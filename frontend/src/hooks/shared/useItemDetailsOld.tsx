import React from "react";

import type { StoreApi, UseBoundStore } from "zustand";
import type { IGetByIdStore } from "../../models/store.model";

interface IUseItemDetails<T> {
  itemToView: T | null;
  isLoadingId: boolean;
}
interface IUseItemDetailsProps<T> {
  useStore: UseBoundStore<StoreApi<IGetByIdStore<T>>>;
  id?: string;
}

export const useItemDetailsOld = <T,>({
  useStore,
  id,
}: IUseItemDetailsProps<T>): IUseItemDetails<T> => {
  const [itemToView, setItemToView] = React.useState<T | null>(null);

  const getById = useStore((state) => state.getById);

  const isLoadingId = useStore((state) => state.isLoadingId === id);

  React.useEffect(() => {
    getById(id).then((i) => {
      setItemToView(i);
    });
  }, [id, getById]);

  return { itemToView, isLoadingId };
};
