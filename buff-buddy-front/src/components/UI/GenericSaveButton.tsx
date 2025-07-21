import type { StoreApi, UseBoundStore } from "zustand";
import Button from "./Button";

interface SavableStore {
  isSavingId: string | null;
}

import type React from "react";

interface GenericSaveButtonProps<T extends SavableStore> {
  itemId?: string;
  useStore: UseBoundStore<StoreApi<T>>;
  saveAction?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "submit" | "button";
}

//TODO??Add loading UI
export default function GenericSaveButton<T extends SavableStore>({
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
      className={`bg-inherit border-1 p-2 hover:bg-main-orange h-full
                             hover:text-white rounded transition-all duration-300
                             hover:cursor-pointer  `}
    >
      {isSaving ? "Saving..." : "Save"}
    </Button>
  );
}
