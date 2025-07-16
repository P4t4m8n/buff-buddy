import { useEffect, useState, type ChangeEvent, type MouseEvent } from "react";

import { useLocation, useNavigate } from "react-router";
import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
  IWorkoutExerciseEditDTO,
} from "../../../models/workout.model";
import { useWorkoutStore } from "../../../store/workout.store";
import { workoutUtils } from "../../../utils/workout.util";
import Loader from "../../UI/Loader";
import WorkoutExerciseEditList from "../WorkoutExercise/Edit/List/WorkoutExerciseEditList";
import { calendarUtil } from "../../../utils/calendar.util";
import WorkoutEditHeader from "./WorkoutEditHeader";

interface WorkoutCreateProps {
  workout?: IWorkoutDTO | IWorkoutEditDTO;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  handleModel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function WorkoutEdit({
  workout,
  setIsOpen,
  handleModel,
}: WorkoutCreateProps) {
  const [workoutToEdit, setWorkoutToEdit] = useState<IWorkoutEditDTO | null>(
    null
  );
  const navigate = useNavigate();
  const pathname = useLocation();
  const isProgramEdit = pathname.pathname.includes("programs");

  const isLoading = useWorkoutStore((state) => state.isLoading);
  const saveWorkout = useWorkoutStore((state) => state.saveWorkout);

  useEffect(() => {
    const _workout = workout
      ? "programId" in workout
        ? workout
        : workoutUtils.dtoToEditDto(workout as IWorkoutDTO)
      : workoutUtils.getEmpty();

    setWorkoutToEdit(_workout);
  }, [workout]);

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

  const onDaysChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const isChecked = target.checked;
    const fixedDay = calendarUtil.shortWeekdayToFull(value);
    setWorkoutToEdit((prev) => {
      if (!prev) return null;
      const newDaysOfWeek = isChecked
        ? [...(prev.daysOfWeek || []), fixedDay]
        : (prev.daysOfWeek || []).filter((day) => day !== fixedDay);
      return {
        ...prev,
        daysOfWeek: newDaysOfWeek,
      };
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!workoutToEdit) return;
    const savedWorkout = await saveWorkout(workoutToEdit);

    if (savedWorkout && setIsOpen) {
      setIsOpen((prev) => !prev);
    } else if (savedWorkout) {
      navigate(-1);
    }
  };

  const onCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (handleModel) {
      handleModel(e);
      return;
    }
    navigate(-1);
  };

  if (!workoutToEdit) {
    return <Loader />;
  }

  const { notes, workoutExercises, name, daysOfWeek } = workoutToEdit;
  const cleanedWorkoutExercises = workoutExercises
    ?.filter((ex) => ex.crudOperation !== "delete")
    .sort((a, b) => (a?.order || 0) - (b?.order || 0));

  return (
    <form
      onSubmit={onSubmit}
      className="h-main p-1 py-2 grid grid-cols-1 grid-rows-[21rem_calc(100%-22rem)] gap-4"
    >
      <WorkoutEditHeader
        name={name}
        notes={notes}
        daysOfWeek={daysOfWeek}
        isProgramEdit={isProgramEdit}
        handleInputChange={handleInputChange}
        onCancel={onCancel}
        isLoading={isLoading}
        workoutExerciseLength={(cleanedWorkoutExercises?.length || 0) + 1}
        onDaysChange={onDaysChange}
        handleWorkoutExercises={handleWorkoutExercises}
      />
      <WorkoutExerciseEditList
        workoutExercises={cleanedWorkoutExercises || []}
        handleWorkoutExercise={handleWorkoutExercises}
      />
    </form>
  );
}
