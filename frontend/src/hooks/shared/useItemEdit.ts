import { useEffect, useState } from "react";
import {
  useMutationKeyStore,
  type TStoreKeys,
} from "../../store/mutationKeys.store";
import useItemMutation from "../queryHooks/useItemMutation";
import type { IEntity } from "../../../../shared/models/entity.model";
import type { THttpResponse } from "../../models/apiService.model";

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
  dtoToEditDto: (dto: DTO) => EditDTO;
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
    errors: mutationErrors,
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
    const itemData = data?.data;
    const item = itemId && itemData ? dtoToEditDto(itemData) : getEmpty();
    setItemToEdit(item);
    return;
  }, [itemId, data]);

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
