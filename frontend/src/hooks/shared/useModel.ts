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

//TODO?? Update JSdocs
import { useCallback, useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type TUseModelHook<T extends HTMLElement> = {
  isOpen: boolean;
  modelRef: React.RefObject<T | null>;
  modelPositionClass: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleModel: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleModelWithPosition: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const useModel = <T extends HTMLElement>(
  callBack?: null | (() => void),
  parentModelRef?: React.RefObject<HTMLDivElement | HTMLFormElement | null>,
  baseModelPositionClass: string | undefined = "top-[calc(100%+.25rem)]"
): TUseModelHook<T> => {
  const [isOpen, setIsOpen] = useState(false);
  const [modelPositionClass, setModelPositionClass] = useState(
    baseModelPositionClass
  );
  const modelRef = useRef<T>(null);

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
    setIsOpen((prev) => !prev);
  }, []);

  const handleModelWithPosition = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isOpen && modelRef.current && parentModelRef?.current) {
        const parentRect = parentModelRef.current.getBoundingClientRect();
        const fieldRect = modelRef.current.getBoundingClientRect();
        const modelHeight = 128;//TODO?? Adjust this value based on your model's height, change from hardcoded to dynamic
        const gap = 4;

        const spaceBelow = parentRect.bottom - fieldRect.bottom;
        const spaceAbove = fieldRect.top - parentRect.top;

        if (spaceBelow >= modelHeight + gap) {
          setModelPositionClass("top-[calc(100%+.25rem)]");
        } else if (spaceAbove >= modelHeight + gap) {
          setModelPositionClass("bottom-[calc(100%+.25rem)]");
        } else {
          setModelPositionClass("top-[calc(100%+.25rem)]");
        }
      }

      setIsOpen((prev) => !prev);
    },
    []
  );

  const checkClickOutside = useCallback(
    (ev: MouseEvent) => {
      const target = ev.target as HTMLElement;

      if (!isOpen || !modelRef?.current || modelRef?.current.contains(target))
        return;

      if (callBack) {
        callBack();
        return;
      }
      setIsOpen(false);
    },
    [isOpen, modelRef, callBack]
  );

  const checkKeyPress = useCallback((ev: KeyboardEvent) => {
    if (ev.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (!modelRef?.current || !isOpen) return;

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
  }, [isOpen, modelRef, checkClickOutside, checkKeyPress]);

  return {
    isOpen,
    modelRef,
    modelPositionClass,
    setIsOpen,
    handleModel,
    handleModelWithPosition,
  };
};
