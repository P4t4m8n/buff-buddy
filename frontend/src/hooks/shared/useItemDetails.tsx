import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import type { StoreApi, UseBoundStore } from "zustand";
import type { IGetByIdStore } from "../../models/store.model";

interface IUseItemDetails<T> {
  id?: string;
  navigate: (path: string) => void;
  itemToView: T | null;
  isLoadingId: boolean;
}
interface IUseItemDetailsProps<T> {
  useStore: UseBoundStore<StoreApi<IGetByIdStore<T>>>;
}

export const useItemDetails = <T,>({
  useStore,
}: IUseItemDetailsProps<T>): IUseItemDetails<T> => {
  const { id } = useParams<{ id?: string }>();

  const navigate = useNavigate();

  const [itemToView, setItemToView] = React.useState<T | null>(null);

  const getById = useStore((state) => state.getById);

  const isLoadingId = useStore((state) => state.isLoadingId === id);

  useEffect(() => {
    getById(id).then((i) => {
      setItemToView(i);
    });
  }, [id, getById]);

  return { id, navigate, itemToView, isLoadingId };
};
