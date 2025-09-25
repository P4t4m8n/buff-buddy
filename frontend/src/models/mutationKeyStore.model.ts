import { MUTATION_STORE_KEYS } from "../consts/mutationKeyStore.const";

import type { IBaseFilter } from "../../../shared/models/app.model";

export type TStoreKeys = (typeof MUTATION_STORE_KEYS)[number];
export type TKeyValue = (string | IBaseFilter | null | undefined)[];

export interface IMutationKeyState extends Record<TStoreKeys, TKeyValue> {}

export interface IMutationKeyActions {
  setMutationKey: (storeKey: TStoreKeys, queryKey: TKeyValue) => void;
  getMutationKey: (storeKey: TStoreKeys) => TKeyValue;
}
