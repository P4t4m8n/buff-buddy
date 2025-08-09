import React, { useEffect, useState } from "react";
import { useExerciseStore } from "../../../store/exercise.store";
import type {
  IExerciseDTO,
  TExerciseInfo,
} from "../../../../../shared/models/exercise.model";
import { useErrors } from "../../shared/useErrors";
import { exerciseService } from "../../../services/exercise.service";
import type {
  ExerciseEquipment,
  ExerciseMuscle,
  ExerciseType,
} from "../../../../../backend/prisma/generated/prisma";

export const useExerciseEdit = (
  exercise?: IExerciseDTO,
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [exerciseToEdit, setExerciseToEdit] = useState<
    IExerciseDTO | undefined | null
  >(null);

  const saveExercise = useExerciseStore((state) => state.saveExercise);

  const { errors, clearErrors, handleError } = useErrors<IExerciseDTO>();
  useEffect(() => {
    setExerciseToEdit(() => (exercise ? exercise : exerciseService.getEmpty()));
  }, [exercise]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    clearErrors();
    const { id: exerciseId } = exerciseToEdit || {};
    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name" + exerciseId) as string;
      const youtubeUrl = formData.get("youtubeUrl" + exerciseId) as string;
      const id = formData.get("id") as string;

      const res = await saveExercise({
        ...exerciseToEdit,
        name,
        youtubeUrl,
        id,
      });
      if (res && setOpen) {
        setOpen(false);
      }
    } catch (error) {
      handleError(error);
    }
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

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    clearErrors();
    setExerciseToEdit(null);
    if (setOpen) setOpen(false);
  };
  return {
    exerciseToEdit,
    setExerciseToEdit,
    onSubmit,
    handleExerciseInfo,
    handleType,
    errors,
    clearErrors,
    handleError,
    saveExercise,
    setOpen,
    onCancel,
  };
};
