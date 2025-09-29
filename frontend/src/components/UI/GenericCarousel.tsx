import React, { Fragment, useEffect, useRef, useState } from "react";

import Button from "./Button";
import IconArrow from "./Icons/IconArrow";

interface IGenericCarouselProps<T, Props> {
  items?: T[];
  props: Props;
  ItemComponent: React.ComponentType<Props & { item?: T }>;
  getKey: (item: T) => string | number;
  containerStyle?: string;
  listStyle?: string;
}

export default function GenericCarousel<T, Props>({
  items,
  props,
  ItemComponent,
  getKey,
  containerStyle,
  listStyle,
}: IGenericCarouselProps<T, Props>) {
  const [isOverflowing, setIsOverflowing] = useState(false);
  console.log("🚀 ~ GenericCarousel ~ isOverflowing:", isOverflowing);
  const scrollContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      const element = scrollContainerRef.current;
      if (!element) return;

      //INFO: is the total scrollable width greater than the visible width?
      const hasOverflow = element.scrollWidth > element.clientWidth;
      setIsOverflowing(hasOverflow);
    };

    checkOverflow();
    const resizeController = new AbortController();

    window.addEventListener("resize", checkOverflow, {
      signal: resizeController.signal,
    });

    return () => {
      resizeController.abort();
    };
  }, [items]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount =
      direction === "left"
        ? -scrollContainerRef.current.offsetWidth
        : scrollContainerRef.current.offsetWidth;

    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="relative grid grid-cols-[auto_1fr_auto] h-8 gap-2">
      {isOverflowing ? (
        <Button
          onClick={() => scroll("left")}
          className="w-8 h-8 flex-center border rounded-full  fill-main-orange -rotate-90"
        >
          <IconArrow className="w-full h-full" />
        </Button>
      ) : null}

      <ul
        ref={scrollContainerRef}
        className="flex flex-1 overflow-hidden snap-x snap-mandatory scroll-smooth scrollbar-hide gap-2"
      >
        {items.map((item) => (
          <Fragment key={getKey(item)}>
            <ItemComponent {...props} item={item} />
          </Fragment>
        ))}
      </ul>

      {isOverflowing ? (
        <Button
          onClick={() => scroll("right")}
          className="w-8 h-8 flex-center border rounded-full  fill-main-orange rotate-90"
        >
          <IconArrow className="w-full h-full" />
        </Button>
      ) : null}
    </div>
  );
}
