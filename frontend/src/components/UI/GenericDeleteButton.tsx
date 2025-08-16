import React from "react";
import Button from "./Button";
import type { StoreApi, UseBoundStore } from "zustand";
import { ModelButtonIcon } from "../../utils/ModelButtonIcon.util";

interface DeletableStore {
  isDeleting: boolean;
}

interface GenericDeleteButtonProps<T extends DeletableStore> {
  itemId?: string;
  useStore: UseBoundStore<StoreApi<T>>;
  deleteAction: (id?: string) => Promise<void>;
}

export default function GenericDeleteButton<T extends DeletableStore>({
  itemId,
  useStore,
  deleteAction,
}: GenericDeleteButtonProps<T>) {
  const isDeleting = useStore((state) => state.isDeleting);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("🚀 ~ handleClick ~ itemId:", itemId)
    if (itemId) {
      deleteAction(itemId);
    }
  };
  const style = isDeleting
    ? "cursor-not-allowed opacity-50"
    : "cursor-pointer ";

  return (
    <Button
      onClick={handleClick}
      buttonStyle="model"
      className={style}
      disabled={isDeleting}
    >
      {ModelButtonIcon("delete")}
    </Button>
  );
}
