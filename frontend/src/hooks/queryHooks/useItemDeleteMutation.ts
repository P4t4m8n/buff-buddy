//Core
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../lib/queryClient";
//Types
import type { THttpResponse } from "../../models/apiService.model";
import type { IEntity } from "../../../../shared/models/entity.model";
import type { TKeyValue } from "../../models/mutationKeyStore.model";

interface IUseItemDeleteMutationProps {
  listKey: TKeyValue;
  itemIdKey: string;
  removeFn?: (id?: string) => Promise<THttpResponse<void>>;
}

export const useItemDeleteMutation = <DTO extends IEntity>({
  removeFn,
  listKey,
  itemIdKey,
}: IUseItemDeleteMutationProps) => {
  return useMutation({
    mutationFn: (itemId: string) =>
      removeFn
        ? removeFn(itemId)
        : Promise.reject("No remove function provided"),
    onSuccess(_, itemId) {
      //INFO: Update the list base on the cache key
      queryClient.setQueryData<THttpResponse<Array<DTO>>>(listKey, (old) => ({
        ...old,
        data: old?.data.filter((item) => item.id !== itemId) ?? [],
      }));
      //INFO: Update the EDIT and Details route
      queryClient.removeQueries({
        queryKey: [itemIdKey, itemId],
        exact: true,
      });
    },
  });
};
