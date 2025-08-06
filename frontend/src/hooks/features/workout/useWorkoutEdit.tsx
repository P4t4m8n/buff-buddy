import { useEffect, useState } from "react";
import type { NavigateFunction } from "react-router";
import { useWorkoutStore } from "../../../store/workout.store";
import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
  IWorkoutExerciseEditDTO,
} from "../../../../../shared/models/workout.model";
import { workoutUtils } from "../../../utils/workout.util";
import { useFormErrors } from "../../shared/useFormErrors";

export const useWorkoutEdit = (
  workout?: IWorkoutDTO | IWorkoutEditDTO,
  navigate?: NavigateFunction | null,
  id?: string,
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
  afterSubmit?: (workout: IWorkoutDTO) => void
) => {
  const [workoutToEdit, setWorkoutToEdit] = useState<IWorkoutEditDTO | null>(
    null
  );

  const { errors, setErrors, handleError } = useFormErrors<IWorkoutEditDTO>();

  const saveWorkout = useWorkoutStore((state) => state.saveWorkout);
  const getById = useWorkoutStore((state) => state.getById);
  const isLoading = useWorkoutStore(
    (state) => state.isLoadingId === workoutToEdit?.id
  );

  useEffect(() => {
    const init = async () => {
      if (workout) {
        const workoutToEdit = workoutUtils.dtoToEditDto(workout);
        setWorkoutToEdit(workoutToEdit);
        return;
      }

      if (!id) {
        const newWorkout = workoutUtils.getEmpty();
        setWorkoutToEdit(newWorkout);
        return;
      }

      try {
        const updateWorkout = await getById(id);
        if (!updateWorkout) {
          setErrors({ unknown: "Workout not found." });
          return;
        }
        const workoutToUpdate = workoutUtils.dtoToEditDto(updateWorkout);
        setWorkoutToEdit(workoutToUpdate);
      } catch (error) {
        handleError(error);
      }
    };

    init();
  }, []);

  //TODO?? improve logic, specially change of order
  const handleWorkoutExercises = (workoutExercise: IWorkoutExerciseEditDTO) => {
    setWorkoutToEdit((prev) => {
      if (!prev) return null;
      const workoutExercises = prev?.workoutExercises ?? [];

      const idx = prev?.workoutExercises?.findIndex(
        (ex) => ex.id === workoutExercise.id
      );

      // Check if this a new item and its not an update of a new item
      if (
        (idx === undefined || idx === -1) &&
        workoutExercise?.crudOperation === "create"
      ) {
        return {
          ...prev,
          workoutExercises: sortAndMapWorkoutExercises([
            workoutExercise,
            ...workoutExercises,
          ]),
        };
      }

      if (idx === undefined || idx === -1) {
        return prev;
      }

      return {
        ...prev,
        workoutExercises: sortAndMapWorkoutExercises(
          workoutExercises.toSpliced(idx!, 1, workoutExercise)
        ),
      };
    });
  };

  const sortAndMapWorkoutExercises = (
    workoutExercises: IWorkoutExerciseEditDTO[]
  ): IWorkoutExerciseEditDTO[] => {
    const length = workoutExercises.length;

    return workoutExercises
      .sort((a, b) => (a?.order || length) - (b?.order || length))
      .map((ex, i) => {
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
    const { name, value } = e.target;
    if (workoutToEdit) {
      setWorkoutToEdit({
        ...workoutToEdit,
        [name]: value,
      });
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      if (!workoutToEdit) return;

      const savedWorkout = await saveWorkout(workoutToEdit);
      if (!savedWorkout) {
        setErrors({ unknown: "Failed to save workout." });
        return;
      }

      if (afterSubmit) {
        afterSubmit(savedWorkout);
      }
      if (setOpen) {
        setOpen(false);
        return;
      } else if (navigate) {
        navigate(-1);
        return;
      } else {
        console.warn(
          "No navigation function provided, cannot redirect after save."
        );
        return;
      }
    } catch (error) {
      handleError(error);
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
