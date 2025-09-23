import { useMutation } from "@tanstack/react-query";

import { queryClient } from "../../lib/queryClient";

import { useErrors } from "../../hooks/shared/useErrors";

import type { THttpResponse } from "../../models/apiService.model";
import type { IBaseFilter } from "../../../../shared/models/app.model";

interface IUseItemMutationProps<EditDTO extends object, DTO> {
  listKey: (string | IBaseFilter | null | undefined)[];
  itemIdKey: string[];
  saveFn: (dto: EditDTO) => Promise<THttpResponse<DTO>>;
  filterFn: (oldItem: DTO, savedItem: DTO) => boolean;
}

export default function useItemMutation<EditDTO extends object, DTO>({
  listKey,
  itemIdKey,
  saveFn,
  filterFn,
}: IUseItemMutationProps<EditDTO, DTO>) {
  const { handleError, errors } = useErrors<EditDTO>();

  const mutation = useMutation({
    mutationFn: (dto: EditDTO) => saveFn(dto),
    onSuccess({ data }) {
      //INFO: Update the list base on the cache key
      queryClient.setQueryData<DTO[]>(listKey, (old) => {
        const idx = old?.findIndex((oldItem) => filterFn(oldItem, data)) ?? -1;
        if (idx < 0) return [...(old ?? []), data];
        return [...(old?.toSpliced(idx, 1, data) ?? [])];
      });
      //INFO: Update the EDIT and Details route
      queryClient.setQueryData<DTO>(itemIdKey, (old) => ({ ...old, ...data }));
    },
    onError(error) {
      handleError({ error, emitToToast: true });
    },
  });

  return { ...mutation, errors };
}
