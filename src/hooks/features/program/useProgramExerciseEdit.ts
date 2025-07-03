import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { useExerciseStore } from "../../../store/exercise.store";
import { programExerciseService } from "../../../services/programExercise.service";
import { coreSetsService } from "../../../services/coreSets.service";
import { calendarUtil } from "../../../utils/calendar.util";
import type {
  IProgramExerciseEditDTO,
  TCrudOperation,
} from "../../../models/programExercise.model";
import type { IExerciseDTO } from "../../../models/exercise.model";
import type { ICoreSetEditDTO } from "../../../models/set.model";

interface IProgramExerciseEditHook {
  programExerciseToEdit: IProgramExerciseEditDTO | null;
  setProgramExerciseToEdit: React.Dispatch<
    React.SetStateAction<IProgramExerciseEditDTO | null>
  >;
  handleSelectExercise: (exercise: IExerciseDTO) => void;
  filterExercises: (searchValue: string) => IExerciseDTO[];
  handleSets: (coreSet?: ICoreSetEditDTO) => void;
  onDaysChange: (e: ChangeEvent) => void;
  handleInputChange: (e: ChangeEvent) => void;
  handleSetChange: (e: ChangeEvent) => void;
  exercises: IExerciseDTO[];
}

export const useProgramExerciseEdit = (
  programExercise?: IProgramExerciseEditDTO,
  programExercisesLength?: number
): IProgramExerciseEditHook => {
  const [programExerciseToEdit, setProgramExerciseToEdit] =
    useState<IProgramExerciseEditDTO | null>(null);
  const exercises = useExerciseStore((state) => state.exercises);
  const loadExercises = useExerciseStore((state) => state.loadExercises);

  useEffect(() => {
    setProgramExerciseToEdit(
      programExercise
        ? programExercise
        : programExerciseService.getEmpty(programExercisesLength)
    );
    loadExercises();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectExercise = (exercise: IExerciseDTO) => {
    setProgramExerciseToEdit((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        exercise: exercise,
        exerciseId: exercise.id,
        coreSets: prev?.coreSets?.length
          ? prev.coreSets
          : [coreSetsService.getEmpty()],
      };
    });
  };

  const filterExercises = (searchValue: string) => {
    if (!searchValue) return exercises;
    return exercises.filter((exercise) =>
      exercise?.name?.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const handleSets = (coreSet?: ICoreSetEditDTO) => {
    setProgramExerciseToEdit((prev) => {
      if (!prev) return null;

      const coreSets = prev?.coreSets ?? [];

      if (!coreSet) {
        const emptySet = coreSetsService.getEmpty(coreSets?.length + 1);
        return {
          ...prev,
          coreSets: organizeCoreSets([...coreSets, emptySet]),
        };
      }

      const idx = prev?.coreSets?.findIndex((cs) => cs.id === coreSet.id);

      if (idx === undefined || idx === -1) {
        return prev;
      }

      return {
        ...prev,
        coreSets: organizeCoreSets(coreSets.toSpliced(idx!, 1, coreSet)),
      };
    });
  };

  const organizeCoreSets = (coreSets: ICoreSetEditDTO[]): ICoreSetEditDTO[] => {
    return coreSets
      .sort((a, b) => (a?.order || 0) - (b?.order || 0))
      .map((ex, i) => {
        console.log(" .map ~ ex:", ex);
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

  const onDaysChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const isChecked = target.checked;
    const fixedDay = calendarUtil.shortWeekdayToFull(value);
    setProgramExerciseToEdit((prev) => {
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

  const handleInputChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    setProgramExerciseToEdit((prev) => {
      if (!prev) return null;
      return type === "number"
        ? { ...prev, [name]: parseInt(value, 10) }
        : { ...prev, [name]: value };
    });
  };

  const handleSetChange = useCallback((e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    const [key, id] = name.split("-");

    setProgramExerciseToEdit((prev) => {
      if (!prev) return null;
      const updatedCoreSets = prev.coreSets?.map((set) => {
        if (set.id === id) {
          return {
            ...set,
            [key]: type === "checkbox" ? checked : parseInt(value, 10),
            crudOperation:
              set?.crudOperation !== "create"
                ? "update"
                : (set?.crudOperation as TCrudOperation),
          };
        }
        return set;
      });
      return {
        ...prev,
        coreSets: updatedCoreSets,
      };
    });
  }, []);

  return {
    programExerciseToEdit,
    setProgramExerciseToEdit,
    handleSelectExercise,
    filterExercises,
    handleSets,
    onDaysChange,
    handleInputChange,
    handleSetChange,
    exercises,
  };
};
