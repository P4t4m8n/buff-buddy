//Lib
import { useEffect, useMemo } from "react";
//Hooks
import { useErrors } from "../../hooks/shared/useErrors";
//UI
import SelectMultiWithSearch from "./Form/SelectMultiWithSearch/SelectMultiWithSearch";
//Types
import type { IBaseNameAndId } from "../../models/UI.model";
import type { ICrudOperation } from "../../../../shared/models/app.model";
import type { UseQueryResult } from "@tanstack/react-query";
import type { THttpResponse } from "../../models/apiService.model";
import type { ISelectAddComponentProps } from "../../models/select.model";

interface GenericItemEditInfoSelectProps<
  DTO extends IBaseNameAndId & ICrudOperation,
  Filter,
  InputNameType
> {
  queryHook(
    filter?: Filter | null
  ): UseQueryResult<THttpResponse<DTO[]>, Error>;
  filter?: Filter | null;
  inputName: InputNameType;
  selectedList?: DTO[]|null;
  mutationError?: string;
  parentModelRef?: React.RefObject<HTMLFormElement | null> | undefined;
  handleSelectInfo: (option: DTO, inputName?: InputNameType) => void;
  AddComponent?: React.ComponentType<ISelectAddComponentProps>;
}
export default function GenericItemEditInfoSelect<
  DTO extends IBaseNameAndId & ICrudOperation,
  Filter,
  InputNameType
>({
  queryHook,
  filter,
  inputName,
  selectedList,
  mutationError,
  parentModelRef,
  handleSelectInfo,
  AddComponent,
}: GenericItemEditInfoSelectProps<DTO, Filter, InputNameType>) {
  const { data, isLoading, error } = queryHook(filter);
  const { handleError } = useErrors();

  useEffect(() => {
    if (error) handleError({ error, emitToToast: true });
  }, [error]);

  const optionList = data?.data ?? [];
  const infoSelect = useMemo(
    () => ({
      inputName,
      options: optionList.filter(
        (ml) => !selectedList?.some((m) => m.name === ml.name)
      ),
      selectedOptions:
        selectedList?.filter((m) => m.crudOperation != "delete") ?? [],
    }),
    [selectedList, optionList]
  );

  return (
    <SelectMultiWithSearch<DTO, InputNameType>
      {...infoSelect}
      isLoading={isLoading}
      error={mutationError}
      parentModelRef={parentModelRef}
      handleSelect={handleSelectInfo}
      filterBy={(item) => item.name!}
      AddComponent={AddComponent}
    />
  );
}
