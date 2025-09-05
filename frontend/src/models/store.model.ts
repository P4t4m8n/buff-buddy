export interface ILoadItemsStore<T, F> {
  loadItems: (filter?: F) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  items: T[];
  isLoading: boolean;
}

export interface IGetByIdStore<T> {
  getById: (id?: string) => Promise<T | null>;
  isLoadingId: string | null;
}

export interface IStoreBase<T, E, F>
  extends ILoadItemsStore<T, F>,
    IGetByIdStore<T> {
  saveItem: (editDto: E) => Promise<void | boolean | T>;
  isDeleting: boolean; //Loading state for item deletion
  isSavingId: string | null; //Loading state for the currently edited item to prevent render or blocking of other items
}

export interface IFoodItemMutationKeyStore<F> {
  mutationKey: (string | F | null | undefined)[];
  setMutationKey: (key: (string | F | null | undefined)[]) => void;
  getMutationKey: () => (string | F | null | undefined)[];
}
