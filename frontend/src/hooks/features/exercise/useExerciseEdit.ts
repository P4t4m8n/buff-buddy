//Core
import React, { useEffect } from "react";
//Services
import { exerciseService } from "../../../services/exercise.service";
//Validation
import { exerciseValidation } from "../../../../../shared/validations/exercise.validation";
//Util
import { exerciseUtil } from "../../../utils/exercise.util";
import { validationUtil } from "../../../../../shared/validations/util.validation";
import { formUtil } from "../../../utils/form.util";
//Hooks
import { useItemEdit } from "../../shared/useItemEdit";
import { useExerciseIdQuery } from "./useExerciseIdQuery";
import { useErrors } from "../../shared/useErrors";
import { useAuthStore } from "../../../store/auth.store";
//Consts
import { QUERY_KEYS } from "../../../consts/queryKeys.consts";
//Types
import type {
  IExerciseDTO,
  IExerciseEditDTO,
} from "../../../../../shared/models/exercise.model";
import type { ExerciseType } from "../../../../../backend/prisma/generated/prisma";
import type { IEquipmentEditDTO } from "../../../../../shared/models/equipment.model";
import type { IMuscleEditDTO } from "../../../../../shared/models/muscle.model";

interface IUseExerciseProps {
  exerciseId?: string;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useExerciseEdit = ({ exerciseId }: IUseExerciseProps) => {
  const {
    itemToEdit: exerciseToEdit,
    setItemToEdit: setExerciseToEdit,
    mutateAsync,
    queryError,
    isLoading,
    isSaving,
  } = useItemEdit<IExerciseEditDTO, IExerciseDTO>({
    storeMutationKey: QUERY_KEYS.EXERCISE_MUTATION_KEY,
    itemId: exerciseId,
    queryIdKey: QUERY_KEYS.EXERCISE_ID_QUERY_KEY,
    saveFn: exerciseService.save,
    useIdQuery: useExerciseIdQuery,
    dtoToEditDto: ({ dto }) => dto,
    getEmpty: exerciseUtil.getEmpty,
  });

  const { handleError, setSingleFiledError, errors } =
    useErrors<IExerciseEditDTO>();

  useEffect(() => {
    if (queryError) handleError({ error: queryError, emitToToast: true });
  }, [queryError]);

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const factory = exerciseToEdit?.id?.startsWith("temp")
      ? exerciseValidation.createFactorySchema
      : exerciseValidation.updateFactorySchema;

    formUtil.onInputChangeWithValidation({
      event,
      setStateToEdit: setExerciseToEdit,
      factory,
      setSingleFiledError,
    });
  };

  const saveExercise = async (formData: FormData) => {
    try {
      const ownerId = useAuthStore.getState().user?.id || null;

      const name = formData.get("name") as string;
      const youtubeUrl = formData.get("youtubeUrl") as string;
      const isCompounded = formData.get("isCompounded") === "on" ? true : false;

      const res = await mutateAsync({
        ...exerciseToEdit,
        name,
        youtubeUrl,
        ownerId,
        isCompounded,
      });

      return !!res.data.id;
    } catch (error) {
      handleError({ error, emitToToast: false });
    }
  };

  const handleExerciseInfo = (
    option: IMuscleEditDTO | IEquipmentEditDTO,
    inputName?: "equipment" | "muscles"
  ) => {
    if (!exerciseToEdit) return;

    if (!inputName) {
      console.warn(
        "handleExerciseInfo called without inputName, this should not happen"
      );
      return;
    }
    const factory = exerciseToEdit?.id?.startsWith("temp")
      ? exerciseValidation.createFactorySchema
      : exerciseValidation.updateFactorySchema;

    const { error } = validationUtil.validateFieldOnly({
      toSanitize: false,
      factory,
      value: [option],
      field: inputName,
    });

    setSingleFiledError({
      key: inputName,
      error,
    });

    setExerciseToEdit((prev) => {
      if (!prev) return prev;

      const currentItems = prev[inputName] || [];
      const idx = currentItems.findIndex((item) => item.name === option.name);

      if (idx > -1) {
        return {
          ...prev,
          [inputName]: currentItems.map((item) =>
            item.name === option.name
              ? {
                  ...item,
                  crudOperation:
                    item.crudOperation != "delete" ? "delete" : "create",
                }
              : item
          ),
        };
      }

      return {
        ...prev,
        [inputName]: [...currentItems, { ...option, crudOperation: "create" }],
      };
    });
  };

  const handleType = (option: ExerciseType) => {
    const factory = exerciseToEdit?.id?.startsWith("temp")
      ? exerciseValidation.createFactorySchema
      : exerciseValidation.updateFactorySchema;

    const { error } = validationUtil.validateFieldOnly({
      toSanitize: false,
      factory,
      value: option,
      field: "type",
    });

    setSingleFiledError({
      key: "type",
      error,
    });

    setExerciseToEdit((prev) => {
      if (!prev) return prev;
      return { ...prev, type: option };
    });
  };

  return {
    exerciseToEdit,
    errors,
    isLoading,
    isSaving,
    saveExercise,
    handleType,
    handleExerciseInfo,
    onInputChange,
  };
};
