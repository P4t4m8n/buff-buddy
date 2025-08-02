import { useEffect, useRef } from "react";

export const useObserver = (
  animationClass?: string,
  cb?: () => any | Promise<any>
) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (animationClass) {
              entry.target.classList.add(animationClass);
            }
            if (cb) {
              cb();
            }
          } else {
            // entry.target.classList.remove(animationCLass);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    const currentRef = observerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return { observerRef };
};
