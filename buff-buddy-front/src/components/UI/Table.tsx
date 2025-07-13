import { Fragment, type ComponentType } from "react";
import { toTitle } from "../../utils/toTitle";
import type { IEntity } from "../../models/entity.model";

interface TableProps<T extends IEntity> {
  tableHeader: string[];
  items: T[];
  ItemComponent: ComponentType<{
    item: T;
    gridCols: string;
    onDelete: (id?: string) => Promise<void>;
  }>;
  gridCols?: string;
  onDelete?: (id?: string) => Promise<void>;
  whenHidden?: "sm" | "md" | "lg" | "xl";
}
export default function Table<T extends IEntity>({
  tableHeader,
  items,
  ItemComponent,
  gridCols,
  onDelete,
  whenHidden,
}: TableProps<T>) {
  const hiddenClass = `hidden ${whenHidden}:inline`;
  return (
    <div className="grid gap-4 p-4">
      <header className={`border-b grid ${gridCols} gap-6 p-4 `}>
        {tableHeader.map((title, idx) => (
          <p
            key={title}
            className={`${
              idx > 0 && idx < tableHeader.length - 1 ? hiddenClass : ""
            } $ ${
              idx === tableHeader.length - 1 ? "text-center lg:text-left " : ""
            }`}
          >
            {toTitle(title)}
          </p>
        ))}
      </header>
      <ul className="grid gap-2">
        {items.map((item) => (
          <Fragment key={item.id}>
            <ItemComponent
              item={item}
              gridCols={gridCols!}
              onDelete={onDelete!}
            />
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
