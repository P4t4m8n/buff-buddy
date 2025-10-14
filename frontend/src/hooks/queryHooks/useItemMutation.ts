import { useMutation } from "@tanstack/react-query";

import { queryClient } from "../../lib/queryClient";

import type { THttpResponse } from "../../models/apiService.model";
import type { IBaseFilter } from "../../../../shared/models/app.model";
import type { IID } from "../../../../shared/models/entity.model";

interface IUseItemMutationProps<
  EditDTO extends object & IID,
  DTO extends IID
> {
  listKey: (string | IBaseFilter | null | undefined)[];
  itemIdKey: string[];
  saveFn: (dto: EditDTO) => Promise<THttpResponse<DTO>>;
  filterFn: (oldItem: DTO, savedItem: DTO) => boolean;
}

export default function useItemMutation<
  EditDTO extends object & IID,
  DTO extends IID
>({
  listKey,
  itemIdKey,
  saveFn,
  filterFn,
}: IUseItemMutationProps<EditDTO, DTO>) {
  const mutation = useMutation({
    mutationFn: async (dto: EditDTO) => await saveFn(dto),
    onSuccess({ data }) {
      //INFO: Update the list base on the cache key
      queryClient.setQueryData<THttpResponse<Array<DTO>>>(listKey, (old) => {
        const idx =
          old?.data.findIndex((oldItem) => filterFn(oldItem, data)) ?? -1;
        if (idx < 0) return { ...old, data: [...(old?.data ?? []), data] };
        return { ...old, data: old?.data.toSpliced(idx, 1, data) ?? [] };
      });
      //INFO: Update the EDIT and Details route
      queryClient.setQueryData<THttpResponse<DTO>>(itemIdKey, (old) => ({
        ...old,
        data: { ...(old?.data ?? {}), ...data },
      }));
    },
  });

  return { ...mutation };
}
