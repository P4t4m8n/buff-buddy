import React from "react";

interface GenericListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getKey: (item: T) => string | number;
  className?: string; // Optional classes for the <ul> container
}

/**
 * A reusable list component that renders a <ul> with items.
 * @param items - The array of data to render.
 * @param renderItem - A function that takes an item and returns a React node to render.
 * @param getKey - A function that takes an item and returns a unique key.
 * @param className - Optional Tailwind classes for the <ul> container.
 */
export default function GenericList<T>({
  items,
  renderItem,
  getKey,
  className,
}: GenericListProps<T>) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <React.Fragment key={getKey(item)}>{renderItem(item)}</React.Fragment>
      ))}
    </ul>
  );
}
