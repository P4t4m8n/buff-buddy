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
  itemComponentProps?: P | ((item: T, index: number) => P | undefined);
  ulStyle?: string;
  getKey: (item: T) => string | number;
  NoItemsComponent?: React.ComponentType;
}

export default function GenericList<T, P>({
  items,
  ulStyle,
  itemComponentProps,
  ItemComponent,
  getKey,
  NoItemsComponent,
}: GenericListProps<T, P>) {
  if (!items || !items.length) {
    return NoItemsComponent ? (
      <NoItemsComponent />
    ) : (
      <p className="text-center text-gray-500">No items found</p>
    );
  }

  return (
    <ul className={ulStyle}>
      {items.map((item, index) => {
        // resolve per-item props if a function was provided, else use the object (or undefined)
        const resolvedProps =
          typeof itemComponentProps === "function"
            ? (itemComponentProps as (item: T, index: number) => P | undefined)(
                item,
                index
              )
            : itemComponentProps;

        return (
          <React.Fragment key={getKey(item)}>
            <ItemComponent item={item} {...(resolvedProps as P)} />
          </React.Fragment>
        );
      })}
    </ul>
  );
}
