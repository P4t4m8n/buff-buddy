import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import type { StoreApi, UseBoundStore } from "zustand";

interface IGetByIdStore<T> {
  getById: (id?: string) => Promise<T | null>;
  isLoadingId: string | null;
}
interface IUseItemDetails<T> {
  id?: string;
  navigate: (path: string) => void;
  itemToView: T | null;
  isLoadingId: boolean;
}
interface IUseItemDetailsProps<T, S extends IGetByIdStore<T>> {
  useStore: UseBoundStore<StoreApi<S>>;
}

export const useItemDetails = <T, S extends IGetByIdStore<T>>({
  useStore,
}: IUseItemDetailsProps<T, S>): IUseItemDetails<T> => {
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
