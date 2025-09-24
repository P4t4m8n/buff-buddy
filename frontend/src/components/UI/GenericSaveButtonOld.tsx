import type { StoreApi, UseBoundStore } from "zustand";
import Button from "./Button";

interface SavableStore {
  isSavingId: string | null;
}

import type React from "react";
import Loader from "./loader/Loader";

interface GenericSaveButtonProps<T extends SavableStore> {
  itemId?: string;
  useStore: UseBoundStore<StoreApi<T>>;
  saveAction?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "button";
}

//TODO??Add loading UI
export default function GenericSaveButtonOld<T extends SavableStore>({
  itemId,
  useStore,
  saveAction,
  type = "submit",
}: GenericSaveButtonProps<T>) {
  const isSaving = useStore((state) => state.isSavingId === itemId);

  return (
    <Button
      type={type}
      disabled={isSaving}
      onClick={saveAction}
      className={`bg-inherit border-1 flex-center  hover:bg-main-orange h-full w-full
                             hover:text-white rounded transition-all duration-300
                             hover:cursor-pointer  `}
    >
      {isSaving ? <Loader loaderType="spinner" /> : "Save"}
    </Button>
  );
}
