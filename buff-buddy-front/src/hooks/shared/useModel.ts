/**
 * A custom hook for managing a boolean state that tracks whether a model is open and automatically handling user interactions to toggle that state.
 *
 * This hook sets up event listeners to:
 * - Close the model when a click is detected outside of the provided DOM element reference.
 * - Close the model when the "Escape" key is pressed.
 *
 * If a callback function is provided via the "callBack" parameter, it will be invoked upon an outside click instead of automatically
 * setting the model's open state to false.
 *
 * @param ref - A React ref object pointing to a DOM element. Used to determine if a mouse click occurred outside of the element.
 * @param callBack - Optional callback function that is executed when an outside click is detected.
 *
 * @returns A tuple with two elements:
 * - A boolean representing whether the model is currently open.
 * - A state setter function to update the open state.
 *
 * @example
 * const [open, setOpen] = useModel(ref, () => console.info("Clicked outside the target element"));
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

export const useModel = (
  ref: React.RefObject<Element | null>|null,
  callBack?: null | (() => void)
): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  (e: React.MouseEvent<HTMLButtonElement>) => void
] => {
  const [open, setOpen] = useState(false);
  const eventListenerRef = useRef<{
    click: (ev: MouseEvent) => void;
    keydown: (ev: KeyboardEvent) => void;
  }>({
    click: () => {},
    keydown: () => {},
  });

  const handleModel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((prev) => !prev);
  }, []);

  const checkClickOutside = useCallback(
    (ev: MouseEvent) => {
      // ev.preventDefault();
      // ev.stopPropagation();
      const target = ev.target as HTMLElement;

      // If clicking a link, delay modal closing until navigation starts
      // if (target.closest('a')) {
      //   ev.preventDefault() // Prevent default anchor behavior
      //   const href = target.closest('a')?.getAttribute('href') // Get link URL

      //   if (href) {
      //     router.navigate({ to: href })
      //     setTimeout(() => setOpen(false), 100) // Delay modal close slightly
      //     return
      //   }
      // }

      // Handle normal outside clicks
      if (!open || !ref?.current || ref?.current.contains(target)) return;

      if (callBack) {
        callBack();
        return;
      }
      setOpen(false);
    },
    [open, ref, callBack]
  );

  const checkKeyPress = useCallback((ev: KeyboardEvent) => {
    if (ev.key === "Escape") {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!ref?.current || !open) return;

    const currentEventListeners = eventListenerRef.current;
    currentEventListeners.click = checkClickOutside;
    currentEventListeners.keydown = checkKeyPress;
    const controller = new AbortController();

    window.addEventListener("mousedown", currentEventListeners.click, {
      signal: controller.signal,
    });
    window.addEventListener("keydown", currentEventListeners.keydown, {
      signal: controller.signal,
    });
    return () => {
      controller.abort();
    };
  }, [open, ref, checkClickOutside, checkKeyPress]);

  const memoizedValue: [
    boolean,
    Dispatch<SetStateAction<boolean>>,
    (e: React.MouseEvent<HTMLButtonElement>) => void
  ] = useMemo(() => [open, setOpen, handleModel], [open, setOpen, handleModel]);

  return memoizedValue;
};
