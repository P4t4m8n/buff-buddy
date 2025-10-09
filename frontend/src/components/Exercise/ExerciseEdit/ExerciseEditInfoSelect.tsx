import { useMemo } from "react";
//Hooks
import { useExerciseInfoList } from "../../../hooks/features/exercise/useExerciseInfoList";
//UI
import SelectMultiWithSearch from "../../UI/Form/SelectMultiWithSearch/SelectMultiWithSearch";
//Types
import type { RefObject } from "react";
import type { IUseExerciseInfoListProps } from "../../../models/exercise.model";
import type { IMuscleEditDTO } from "../../../../../shared/models/muscle.model";
import type { IEquipmentEditDTO } from "../../../../../shared/models/equipment.model";

interface IExerciseEditInfoSelectProps<
  T extends IMuscleEditDTO | IEquipmentEditDTO,
  Filter
> extends IUseExerciseInfoListProps<T, Filter> {
  inputName: "muscles" | "equipment";
  selectedList?: T[];
  mutationError?: string;
  parentModelRef: RefObject<HTMLFormElement | null> | undefined;
  handleExerciseInfo: (
    option: IMuscleEditDTO | IEquipmentEditDTO,
    inputName?: "equipment" | "muscles"
  ) => void;
}

export default function ExerciseEditInfoSelect<
  T extends IMuscleEditDTO | IEquipmentEditDTO,
  Filter
>({
  queryHook,
  handleExerciseInfo,
  filter,
  inputName,
  selectedList,
  mutationError,
  parentModelRef,
}: IExerciseEditInfoSelectProps<T, Filter>) {
  const { items: optionList, isLoading } = useExerciseInfoList({
    filter,
    queryHook,
  });
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
    <SelectMultiWithSearch
      {...infoSelect}
      isLoading={isLoading}
      error={mutationError}
      parentModelRef={parentModelRef}
      handleSelect={handleExerciseInfo}
      filterBy={(item) => item.name!}
    />
  );
}
