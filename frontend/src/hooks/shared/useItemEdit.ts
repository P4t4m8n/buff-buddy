import { useEffect, useState } from "react";

import { useMutationKeyStore } from "../../store/mutationKeys.store";

import useItemMutation from "../queryHooks/useItemMutation";

import type { IEntity } from "../../../../shared/models/entity.model";
import type { THttpResponse } from "../../models/apiService.model";
import type { TStoreKeys } from "../../models/mutationKeyStore.model";

interface IUseIdQuery<DTO extends IEntity> {
  data: THttpResponse<DTO | null> | undefined;
  isLoading: boolean;
  error: Error | null;
}

interface IItemMutationParams<
  EditDTO extends IEntity & object,
  DTO extends IEntity
> {
  storeMutationKey: TStoreKeys;
  itemId?: string;
  queryIdKey: string;
  saveFn: (dto: EditDTO) => Promise<THttpResponse<DTO>>;
  useIdQuery: (id?: string | undefined) => IUseIdQuery<DTO>;
  dtoToEditDto: ({
    dto,
    isEdit,
    isCopy,
  }: {
    dto: DTO;
    isEdit?: boolean;
    isCopy?: boolean;
  }) => EditDTO;
  getEmpty: () => EditDTO;
}
export const useItemEdit = <
  EditDTO extends IEntity & object,
  DTO extends IEntity
>({
  storeMutationKey,
  itemId,
  queryIdKey,
  saveFn,
  useIdQuery,
  dtoToEditDto,
  getEmpty,
}: IItemMutationParams<EditDTO, DTO>) => {
  const [itemToEdit, setItemToEdit] = useState<EditDTO | null>(null);

  const mutationKey = useMutationKeyStore((store) => store[storeMutationKey]);

  const {
    error: mutationErrors,
    mutateAsync,
    isPending: isSaving,
  } = useItemMutation<EditDTO, DTO>({
    listKey: mutationKey,
    itemIdKey: [queryIdKey, itemId ?? ""],
    saveFn: saveFn,
    filterFn: (oldItem, savedItem) => oldItem.id === savedItem.id,
  });
  const { data, isLoading, error: queryError } = useIdQuery(itemId);

  useEffect(() => {
    if (isLoading) return;
    const itemData = data?.data;
    const item =
      itemId && itemData
        ? dtoToEditDto({ dto: itemData, isEdit: true })
        : getEmpty();
    setItemToEdit(item);
    return;
  }, [itemId, data, isLoading]);

  return {
    itemToEdit,
    setItemToEdit,
    mutateAsync,
    mutationErrors,
    queryError,
    isLoading,
    isSaving,
  };
};
