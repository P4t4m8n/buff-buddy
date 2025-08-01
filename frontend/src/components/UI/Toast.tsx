import { useEffect, useRef, useState } from "react";
import { eventEmitter, TOAST_TYPES } from "../../utils/toast.util";

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
        timeoutIdRef.current = setTimeout(closeMsg, 2000);
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

  if (!toastComponent) return null;

  return (
    <section
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className=" fixed bottom-8 z-50  bg-green-500"
    >
      {toastComponent}
    </section>
  );
}
