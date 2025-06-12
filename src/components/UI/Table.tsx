import { Fragment, type ComponentType } from "react";
import { toTitle } from "../../utils/toTitle";
import type { IEntity } from "../../models/entity.model";

interface TableProps<T extends IEntity> {
  header: string[];
  items: T[];
  ItemComponent: ComponentType<{
    item: T;
    gridCols: string;
    onDelete: (id?: string) =>  Promise<void>;
  }>;
  gridCols?: string;
  onDelete?: (id?: string) =>  Promise<void>;
}
export default function Table<T extends IEntity>({
  header,
  items,
  ItemComponent,
  gridCols,
  onDelete,
}: TableProps<T>) {
  return (
    <div className="grid gap-4 p-4">
      <header className={`border-b grid grid-cols-${gridCols} gap-6 p-4 `}>
        {header.map((title) => (
          <p key={title}>{toTitle(title)}</p>
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
