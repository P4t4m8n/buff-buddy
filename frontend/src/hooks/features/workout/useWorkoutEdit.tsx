import { useEffect, useState } from "react";

import { useWorkoutStore } from "../../../store/workout.store";

import { ClientError } from "../../../services/ClientError.service";

import { useErrors } from "../../shared/useErrors";
import { workoutUtil } from "../../../utils/workout.util";
import { formUtil } from "../../../utils/form.util";

import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
  IWorkoutExerciseEditDTO,
} from "../../../../../shared/models/workout.model";

interface IUseWorkoutEditProps {
  workoutId?: string;
  workout?: IWorkoutDTO;
}

export const useWorkoutEdit = ({
  workout,
  workoutId,
}: IUseWorkoutEditProps) => {
  const [workoutToEdit, setWorkoutToEdit] = useState<IWorkoutEditDTO | null>(
    null
  );

  const { errors, handleError } = useErrors<IWorkoutEditDTO>();

  const saveWorkout = useWorkoutStore((state) => state.saveItem);
  const getById = useWorkoutStore((state) => state.getById);
  const isLoading = useWorkoutStore(
    (state) => state.isLoadingId === workoutToEdit?.id
  );

  useEffect(() => {
    const init = async () => {
      if (workout) {
        const workoutToEdit = workoutUtil.dtoToEditDto({
          dto: workout,
          isEdit: true,
        });
        setWorkoutToEdit(workoutToEdit);
        return;
      }

      if (!workoutId) {
        const newWorkout = workoutUtil.getEmpty();
        setWorkoutToEdit(newWorkout);
        return;
      }

      try {
        const updateWorkout = await getById(workoutId);
        if (!updateWorkout) {
          throw ClientError.create("Workout not found");
        }
        const workoutToUpdate = workoutUtil.dtoToEditDto({
          dto: updateWorkout,
          isEdit: true,
        });
        setWorkoutToEdit(workoutToUpdate);
      } catch (error) {
        handleError({ error });
      }
    };

    init();
  }, []);

  const handleWorkoutExercises = (workoutExercise: IWorkoutExerciseEditDTO) => {
    setWorkoutToEdit((prev) => {
      if (!prev) return null;
      const workoutExercises = prev?.workoutExercises ?? [];
      const updatedWorkoutExercises = [...workoutExercises];

      const idx = updatedWorkoutExercises?.findIndex(
        (ex) => ex.id === workoutExercise.id
      );

      const orderIdx =
        updatedWorkoutExercises?.findIndex(
          (we) => we.order === workoutExercise.order
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
      const [removedItem] = updatedWorkoutExercises.splice(idx, 1);
      updatedWorkoutExercises?.splice(x, 0, removedItem);

      return {
        ...prev,
        workoutExercises: sortAndMapWorkoutExercises(updatedWorkoutExercises),
      };
    });
  };

  const sortAndMapWorkoutExercises = (
    workoutExercises: IWorkoutExerciseEditDTO[]
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    formUtil.handleInputChange(e, setWorkoutToEdit);
  };

  const onSubmit = async () => {
    try {
      if (!workoutToEdit)
        throw ClientError.create("Workout to edit is not defined");

      return await saveWorkout(workoutToEdit);
    } catch (error) {
      handleError({ error });
    }
  };

  return {
    workoutToEdit,
    isLoading,
    errors,
    handleWorkoutExercises,
    handleInputChange,
    onSubmit,
  };
};
