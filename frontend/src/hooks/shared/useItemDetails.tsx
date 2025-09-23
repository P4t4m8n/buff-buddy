import React, { useEffect } from "react";

import type { THttpResponse } from "../../models/apiService.model";

interface IUseIdQuery<T> {
  data: THttpResponse<T> | undefined;
  isLoading: boolean;
}
interface IUseItemDetailsProps<DTO, EditDTO> {
  useIdQuery: (id?: string) => IUseIdQuery<DTO>;
  itemId?: string;
  dtoToEditDto: (item: DTO) => EditDTO;
  getEmpty: () => EditDTO;
  setItem: React.Dispatch<React.SetStateAction<DTO | EditDTO | null>>;
}

export const useItemDetails = <T, F>({
  useIdQuery,
  itemId,
  dtoToEditDto,
  getEmpty,
  setItem,
}: IUseItemDetailsProps<T, F>) => {
  const { data, isLoading } = useIdQuery(itemId);

  useEffect(() => {
    const itemData = data?.data;
    const foodItem = itemId && itemData ? dtoToEditDto(itemData) : getEmpty();
    setItem(foodItem);
    return;
  }, [itemId, data]);

  return { isLoading };
};
