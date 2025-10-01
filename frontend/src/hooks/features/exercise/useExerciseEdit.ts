//-Core
import React, { useEffect } from "react";
//-Services
import { exerciseService } from "../../../services/exercise.service";
//-Util
import { exerciseUtil } from "../../../utils/exercise.util";
//-Hooks
import { useItemEdit } from "../../shared/useItemEdit";
import { useExerciseIdQuery } from "./useExerciseIdQuery";
import { useErrors } from "../../shared/useErrors";
//-Consts
import { QUERY_KEYS } from "../../../consts/queryKeys.consts";
//-Types
import type {
  IExerciseDTO,
  TExerciseInfo,
} from "../../../../../shared/models/exercise.model";
import type {
  ExerciseEquipment,
  ExerciseMuscle,
  ExerciseType,
} from "../../../../../backend/prisma/generated/prisma";
import { useAuthStore } from "../../../store/auth.store";

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
    dtoToEditDto: ({ dto }) => dto,
    getEmpty: exerciseUtil.getEmpty,
  });

  const { clearErrors, handleError } = useErrors<IExerciseDTO>();

  useEffect(() => {
    if (queryError) handleError({ error: queryError, emitToToast: true });
  }, [queryError]);

  const saveExercise = async (formData: FormData) => {
    clearErrors();
    const ownerId = useAuthStore.getState().user?.id || null;

    const name = formData.get("name") as string;
    const youtubeUrl = formData.get("youtubeUrl") as string;

    const res = await mutateAsync({
      ...exerciseToEdit,
      name,
      youtubeUrl,
      ownerId,
    });

    return !!res.data.id;
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

  return {
    exerciseToEdit,
    mutationErrors,
    isLoading,
    isSaving,
    saveExercise,
    handleType,
    handleExerciseInfo,
  };
};
