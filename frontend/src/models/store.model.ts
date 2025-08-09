export interface IStoreBase<T, E, F> extends ILoadItemsStore<T, F> {
  saveItem: (editDto: E) => Promise<void | boolean | T>;
  isDeleting: boolean; //Loading state for item deletion
  isSavingId: string | null; //Loading state for the currently edited item to prevent render or blocking of other items
  isLoadingId: string | null; //Loading state for the currently loaded item
}

export interface ILoadItemsStore<T, F> {
  loadItems: (filter?: F) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  items: T[];
  isLoading: boolean;
}
