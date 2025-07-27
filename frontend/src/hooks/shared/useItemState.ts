import { useEffect, useState } from "react";

type IUseItemStateHook<T> = [
  T | null,
  React.Dispatch<React.SetStateAction<T | null>>
];
export const useItemState = <T>(item?: T | null): IUseItemStateHook<T> => {
  const [itemState, setItemState] = useState<T | null>(null);

  useEffect(() => {
    if (item) {
      setItemState(item);
    } else {
      setItemState(null);
    }
  }, [item]);

  return [itemState, setItemState];
};
