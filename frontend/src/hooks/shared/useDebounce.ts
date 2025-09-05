import { useEffect, useState } from "react";

interface IUseDebounceProps<T> {
  value: T;
  delay: number;
}

export const useDebounceValue = <T>({ value, delay }: IUseDebounceProps<T>) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
