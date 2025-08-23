import { useEffect, useState } from "react";
import { useWorkoutStore } from "../../../store/workout.store";
import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
  IWorkoutExerciseEditDTO,
} from "../../../../../shared/models/workout.model";
import { workoutUtils } from "../../../utils/workout.util";
import { useErrors } from "../../shared/useErrors";
import { ClientError } from "../../../services/ClientError.service";

interface IUseWorkoutEditProps {
  workoutId?: string;
  workout?: IWorkoutDTO | IWorkoutEditDTO;
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
        const workoutToEdit = workoutUtils.dtoToEditDto(workout);
        setWorkoutToEdit(workoutToEdit);
        return;
      }

      if (!workoutId) {
        const newWorkout = workoutUtils.getEmpty();
        setWorkoutToEdit(newWorkout);
        return;
      }

      try {
        const updateWorkout = await getById(workoutId);
        if (!updateWorkout) {
          throw ClientError.create("Workout not found");
        }
        const workoutToUpdate = workoutUtils.dtoToEditDto(updateWorkout);
        setWorkoutToEdit(workoutToUpdate);
      } catch (error) {
        handleError({ error });
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
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    let newVal: boolean | string | number | null;
    switch (type) {
      case "checkbox":
        newVal = checked;
        break;
      case "number":
        newVal = parseFloat(value);
        break;
      default:
        newVal = value;
        break;
    }
    if (workoutToEdit) {
      setWorkoutToEdit({
        ...workoutToEdit,
        [name]: newVal,
      });
    }
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
