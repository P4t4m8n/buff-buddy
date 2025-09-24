import React from "react";
import type {
  IExerciseDTO,
  TExerciseInfo,
} from "../../../../../shared/models/exercise.model";
import type {
  ExerciseEquipment,
  ExerciseMuscle,
  ExerciseType,
} from "../../../../../backend/prisma/generated/prisma";
import { exerciseUtil } from "../../../utils/exercise.util";
import { useItemEdit } from "../../shared/useItemEdit";
import { QUERY_KEYS } from "../../../consts/queryKeys.consts";
import { exerciseService } from "../../../services/exercise.service";
import useExerciseIdQuery from "./useExerciseIdQuery";

interface IUseExerciseProps {
  exerciseId?: string;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useExerciseEdit = ({ exerciseId }: IUseExerciseProps) => {
  const {
    itemToEdit: exerciseToEdit,
    setItemToEdit: setExerciseToEdit,
    mutateAsync,
    mutationErrors,
    queryError,
    isLoading,
    isSaving,
  } = useItemEdit<IExerciseDTO, IExerciseDTO>({
    storeMutationKey: "exerciseMutationKey",
    itemId: exerciseId,
    queryIdKey: QUERY_KEYS.EXERCISE_ID_QUERY_KEY,
    saveFn: exerciseService.save,
    useIdQuery: useExerciseIdQuery,
    dtoToEditDto: (item) => item,
    getEmpty: exerciseUtil.getEmpty,
  });

  const saveExercise = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const youtubeUrl = formData.get("youtubeUrl") as string;
    const id = formData.get("id") as string;

    return await mutateAsync({
      ...exerciseToEdit,
      name,
      youtubeUrl,
      id,
    });
  };

  const handleExerciseInfo = (
    option: ExerciseMuscle | ExerciseEquipment,
    inputName?: TExerciseInfo
  ) => {
    if (!exerciseToEdit) return;
    if (!inputName) {
      console.warn(
        "handleExerciseInfo called without inputName, this should not happen"
      );
      return;
    }

    setExerciseToEdit((prev) => {
      if (!prev) return prev;

      const currentItems =
        (prev[inputName as keyof IExerciseDTO] as string[]) || [];
      const idx = currentItems.findIndex((item) => item === option);

      return idx !== -1
        ? {
            ...prev,
            [inputName]: currentItems.filter((item) => item !== option),
          }
        : { ...prev, [inputName]: [...currentItems, option] };
    });
  };

  const handleType = (option: ExerciseType) => {
    setExerciseToEdit((prev) => {
      if (!prev) return prev;
      return { ...prev, type: option };
    });
  };

  const clearItem = () => {
    setExerciseToEdit(null);
  };
  return {
    exerciseToEdit,
    mutationErrors,
    queryError,
    isLoading,
    isSaving,
    saveExercise,
    handleType,
    handleExerciseInfo,
    clearItem,
  };
};
