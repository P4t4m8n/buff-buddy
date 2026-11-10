//Services
import { ClientError } from "../../../services/ClientError.service";
import { workoutService } from "../../../services/workout.service";
//Hooks
import { useItemEdit } from "../../shared/useItemEdit";
import { useWorkoutIdQuery } from "./useWorkoutIdQuery";
//Validation
import { workoutValidation } from "../../../../../shared/validations/workout.validations";
//Utils
import { workoutUtil } from "../../../utils/workout.util";
import { formUtil } from "../../../utils/form.util";
//Consts
import { QUERY_KEYS } from "../../../consts/queryKeys.consts";
//Types
import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
  IWorkoutExerciseEditDTO,
} from "../../../../../shared/models/workout.model";
import { useAuthStore } from "../../../store/auth.store";
import { useErrors } from "@/hooks/shared/useErrors";

interface IUseWorkoutEditProps {
  workoutId?: string;
  isCopy?: boolean;
}

export const useWorkoutEdit = ({ workoutId, isCopy }: IUseWorkoutEditProps) => {
  const {
    itemToEdit: workoutToEdit,
    setItemToEdit: setWorkoutToEdit,
    mutateAsync,
    mutationErrors,
    queryError,
    isLoading,
    isSaving,
  } = useItemEdit<IWorkoutEditDTO, IWorkoutDTO>({
    itemId: workoutId,
    storeMutationKey: QUERY_KEYS.WORKOUT_MUTATION_KEY,
    queryIdKey: QUERY_KEYS.WORKOUT_ID_QUERY_KEY,
    saveFn: workoutService.save,
    useIdQuery: useWorkoutIdQuery,
    dtoToEditDto: ({ dto, isEdit }) =>
      workoutUtil.dtoToEditDto({ dto, isEdit, isCopy }),
    getEmpty: workoutUtil.getEmpty,
  });

  const { handleError, setSingleFiledError, errors } =
      useErrors<IWorkoutEditDTO>();

  const handleWorkoutExercises = (workoutExercise: IWorkoutExerciseEditDTO) => {
    setWorkoutToEdit((prev) => {
      if (!prev) return null;
      const workoutExercises = prev?.workoutExercises ?? [];
      const updatedWorkoutExercises = [...workoutExercises];

      const idx = updatedWorkoutExercises?.findIndex(
        (ex) => ex.id === workoutExercise.id,
      );

      const orderIdx =
        updatedWorkoutExercises?.findIndex(
          (we) => we.order === workoutExercise.order,
        ) ?? -1;

      const x = orderIdx < 0 ? updatedWorkoutExercises.length : orderIdx;

      if (
        (idx === undefined || idx === -1) &&
        workoutExercise?.crudOperation === "create"
      ) {
        updatedWorkoutExercises?.splice(x, 0, workoutExercise);

        return {
          ...prev,
          workoutExercises: sortAndMapWorkoutExercises(updatedWorkoutExercises),
        };
      }

      if (idx === undefined || idx === -1) {
        return prev;
      }
      if (idx >= 0) {
        updatedWorkoutExercises[idx] = workoutExercise;
      }
      const [removedItem] = updatedWorkoutExercises.splice(idx, 1);
      updatedWorkoutExercises?.splice(x, 0, removedItem);

      return {
        ...prev,
        workoutExercises: sortAndMapWorkoutExercises(updatedWorkoutExercises),
      };
    });
  };

  const sortAndMapWorkoutExercises = (
    workoutExercises: IWorkoutExerciseEditDTO[],
  ): IWorkoutExerciseEditDTO[] => {
    return workoutExercises.map((ex, i) => {
      const isChangeOrder = ex.order !== i + 1;

      if (!isChangeOrder || ex.crudOperation === "delete") return ex;
      return {
        ...ex,
        order: i + 1,
        crudOperation:
          ex.crudOperation !== "create" ? "update" : ex.crudOperation,
      };
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const factory = workoutToEdit?.id?.startsWith("temp")
      ? workoutValidation.createFactorySchema
      : workoutValidation.updateFactorySchema;

    formUtil.onInputChangeWithValidation({
      event: e,
      setStateToEdit: setWorkoutToEdit,
      factory,
      setSingleFiledError,
    });
  };

  const saveWorkout = async () => {
    try {
      if (!workoutToEdit)
        throw ClientError.create("Workout to edit is not defined");
      const ownerId = useAuthStore.getState().user?.id || null;
      workoutToEdit.ownerId = ownerId;

      const { data } = await mutateAsync(workoutToEdit);
      return data;
    } catch (error) {
      handleError({ error, emitToToast: false });
    }
  };

  return {
    workoutToEdit,
    isLoading,
    isSaving,
    queryError,
    mutationErrors:errors,
    handleWorkoutExercises,
    handleInputChange,
    saveWorkout,
  };
};
