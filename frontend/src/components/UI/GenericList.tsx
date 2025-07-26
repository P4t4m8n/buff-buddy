import React from "react";
import type { ComponentType } from "react";

/**
 * A reusable list component that renders a <ul> with items.
 * @param items - The array of data to render.
 * @param ItemComponent - The React component to render for each item in the list.
 * @param itemComponentProps - The props to pass down to each `ItemComponent`.
 * @param getKey - A function that takes an item and returns a unique key.
 * @param ulStyle - Optional Tailwind classes for the <ul> container.
 */

interface GenericListProps<T, P> {
  items: T[];
  ItemComponent: ComponentType<{ item: T } & P>;
  itemComponentProps?: P;
  ulStyle?: string;
  getKey: (item: T) => string | number;
}

export default function GenericList<T, P>({
  items,
  ulStyle,
  itemComponentProps,
  ItemComponent,
  getKey,
}: GenericListProps<T, P>) {
  return (
    <ul className={ulStyle}>
      {items.map((item) => (
        <React.Fragment key={getKey(item)}>
          <ItemComponent item={item} {...(itemComponentProps as P)} />
        </React.Fragment>
      ))}
    </ul>
  );
}
