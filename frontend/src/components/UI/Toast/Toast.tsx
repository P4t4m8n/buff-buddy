import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { eventEmitter, TOAST_TYPES } from "../../../utils/toast.util";

const TIMEOUT_DURATION = 2000;

//TODO?? animation is only moving up. move down not working need to add a 3rd state for the finished animation before destroying the toastCOmponent
export default function Toast() {
  const [toastComponent, setToastComponent] = useState<React.ReactNode | null>(
    null
  );
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const toastEventUnsubscribe = useRef<(() => void)[]>([]);

  useEffect(() => {
    toastEventUnsubscribe.current = TOAST_TYPES.map((type) => {
      return eventEmitter.on(type, (cmp) => {
        setToastComponent(cmp);
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
          timeoutIdRef.current = null;
        }
        timeoutIdRef.current = setTimeout(closeMsg, TIMEOUT_DURATION);
      });
    });
    return () => {
      toastEventUnsubscribe.current.forEach((unsubscribe) => {
        unsubscribe();
      });
    };
  }, []);

  const closeMsg = () => {
    setTimeout(() => {
      setToastComponent(null);
    }, 500);
  };

  const handleMouseEnter = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    timeoutIdRef.current = setTimeout(closeMsg, 2000);
  };

  const toastStyle = twMerge(
    "fixed z-50 h-fit w-full px-4 items-center justify-center flex transition-all duration-300",
    toastComponent ? " bottom-8 " : "-bottom-8"
  );

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={toastStyle}
    >
      {toastComponent}
    </div>
  );
}
