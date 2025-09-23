import { useCallback, useEffect, useState } from "react";

import { programWorkoutUtil } from "../../../utils/programWorkout.util";
import { calendarUtil } from "../../../utils/calendar.util";
import { workoutUtil } from "../../../utils/workout.util";
import { appUtil } from "../../../utils/app.util";

import type {
  IProgramWorkoutDTO,
  IProgramWorkoutEditDTO,
} from "../../../../../shared/models/program.model";
import type { IWorkoutDTO } from "../../../../../shared/models/workout.model";

export const useProgramWorkoutEdit = (programWorkout?: IProgramWorkoutDTO) => {
  const [selectedWorkout, setSelectedWorkout] =
    useState<IProgramWorkoutEditDTO | null>(null);
  useEffect(() => {
    const workoutEdit = programWorkoutUtil.dtoToEditDto(programWorkout);

    setSelectedWorkout(workoutEdit ?? null);
  }, [programWorkout]);

  const onDaysChange = useCallback((e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { value, checked } = target;
    const fixedDay = calendarUtil.shortWeekdayToFull(value);

    setSelectedWorkout((prev) => {
      if (!prev) return null;

      const newDaysOfWeek = checked
        ? [...(prev.daysOfWeek || []), fixedDay]
        : (prev.daysOfWeek || []).filter((day) => day !== fixedDay);

      const crudOperation = appUtil.createOrUpdateCrud(
        prev.id,
        prev.crudOperation
      );

      return {
        ...prev,
        crudOperation,
        daysOfWeek: newDaysOfWeek,
      };
    });
  }, []);

  const onSelectProgramWorkout = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement>,
      workout?: IWorkoutDTO,
      isCopy?: boolean
    ) => {
      e.preventDefault();
      e.stopPropagation();
      let _workout = null;
      if (workout) {
        const empty = programWorkoutUtil.getEmpty();
        _workout = programWorkoutUtil.dtoToEditDto(
          { ...empty, workout },
          isCopy
        );
      }

      setSelectedWorkout(_workout);
    },
    []
  );

  const handleSelectedWorkoutUpdate = useCallback(
    (workout: IWorkoutDTO | null) => {
      setSelectedWorkout((prev) => {
        if (!prev) return null;
        if (!workout) return prev;
        const updatedWorkout = workoutUtil.dtoToEditDto({
          dto: workout,
          isEdit: false,
        });
        return {
          ...prev,
          workout: updatedWorkout,
        };
      });
    },
    []
  );

  const handleWorkoutPlannerInfo = useCallback(
    (option: string, inputName?: "level" | "workoutGoal") => {

      setSelectedWorkout((prev) => {
        if (!prev) return null;

        const _inputName = inputName || "level";
        return {
          ...prev,
          [_inputName]: option,
        };
      });
    },
    []
  );

  return {
    selectedWorkout,
    onDaysChange,
    onSelectProgramWorkout,
    handleSelectedWorkoutUpdate,
    handleWorkoutPlannerInfo,
  };
};
