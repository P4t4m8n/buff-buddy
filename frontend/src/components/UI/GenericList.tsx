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
  items?: T[];
  ulStyle?: string;
  ItemComponent: ComponentType<{ item: T } & P>;
  NoItemsComponent?: React.ComponentType;
  getKey: (item: T) => string | number;
  itemComponentProps?: P | ((item: T, index: number) => P | undefined);
}

function GenericListMemo<T, P>({
  items,
  ulStyle,
  ItemComponent,
  NoItemsComponent,
  getKey,
  itemComponentProps,
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
        /*
         * INFO: resolve per-item props if a function was provided,
         * else use the object (or undefined)
         */
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

const shallowEqual = (a: any, b: any) => {
  if (a === b) return true;

  if (!a || !b) return false;

  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) return false;

  for (const k of aKeys) {
    if (a[k] !== b[k]) return false;
  }

  return true;
};

const arePropsEqual = (prevProps: any, nextProps: any) => {
  if (
    prevProps.items !== nextProps.items ||
    prevProps.ItemComponent !== nextProps.ItemComponent ||
    prevProps.getKey !== nextProps.getKey ||
    prevProps.ulStyle !== nextProps.ulStyle
  ) {
    return false;
  }

  const p = prevProps.itemComponentProps;
  const n = nextProps.itemComponentProps;

  if (typeof p === "function" || typeof n === "function") {
    return p === n;
  }

  return shallowEqual(p, n);
};

export default React.memo(
  GenericListMemo,
  arePropsEqual
) as typeof GenericListMemo;
