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
  setProgramExerciseToEdit: React.Dispatch<
    React.SetStateAction<IProgramExerciseEditDTO | null>
  >;
  handleSelectExercise: (exercise: IExerciseDTO) => void;
  filterExercises: (searchValue: string) => IExerciseDTO[];
  handleSets: (coreSet?: ICoreSetEditDTO) => void;
  onDaysChange: (e: ChangeEvent) => void;
  handleInputChange: (e: ChangeEvent) => void;
  handleSetChange: (e: ChangeEvent) => void;
  validateProgramExercise: (
    programExercise: IProgramExerciseEditDTO
  ) => boolean;
  programExerciseToEdit: IProgramExerciseEditDTO | null;
  exercises: IExerciseDTO[];
  programExerciseErrors: Partial<
    Record<keyof IProgramExerciseEditDTO, string>
  > | null;
  coreSetsErrors: Partial<Record<string, string>>[] | null;
  restProgramExerciseToEdit: () => void;
}

export const useProgramExerciseEdit = (
  programExercise?: IProgramExerciseEditDTO,
  programExercisesLength?: number
): IProgramExerciseEditHook => {
  const [programExerciseToEdit, setProgramExerciseToEdit] =
    useState<IProgramExerciseEditDTO | null>(null);
  const exercises = useExerciseStore((state) => state.exercises);
  const loadExercises = useExerciseStore((state) => state.loadExercises);
  const [programExerciseErrors, setProgramExerciseErrors] = useState<Partial<
    Record<keyof IProgramExerciseEditDTO, string>
  > | null>(null);

  const [coreSetsErrors, setCoreSetsErrors] = useState<
    Partial<Record<string, string>>[] | null
  >(null);

  useEffect(() => {
    restProgramExerciseToEdit();
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
            weight: key === "isBodyWeight" ? 0 : set.weight,
            [key]: type === "checkbox" ? checked : parseFloat(value),
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

  //TODO??refactor this function to improve readability and reduce complexity
  const validateProgramExercise = (
    programExercise: IProgramExerciseEditDTO
  ) => {
    const _programExerciseErrors: Partial<
      Record<keyof IProgramExerciseEditDTO, string>
    > = {};
    const _coreSetsErrors: Partial<Record<string, string>>[] = [];

    if (!programExercise.order || programExercise.order < 1) {
      _programExerciseErrors.order = "Order must be a positive number.";
    }

    if (!programExercise.exerciseId) {
      _programExerciseErrors.exerciseId = "Exercise must be selected.";
    }

    if (
      !programExercise.daysOfWeek ||
      programExercise.daysOfWeek.length === 0
    ) {
      _programExerciseErrors.daysOfWeek =
        "At least one day of the week must be selected.";
    }
    if (!programExercise.coreSets || programExercise.coreSets.length === 0) {
      _programExerciseErrors.coreSets = "At least one set is required.";
    }

    programExercise.coreSets?.forEach((set) => {
      if (!set.id) {
        console.error("Set ID is required.");
        return;
      }

      const error: Partial<Record<string, string>> = {
        id: set.id,
      };

      let errorFlag = false;
      if (!set.reps || set.reps < 1) {
        error.reps = "Reps must be a positive number.";
        errorFlag = true;
      }
      if (set.isBodyWeight && set.weight && set.weight < 0) {
        error.weight = "Weight cannot be negative.";
        errorFlag = true;
      }
      if (!set.restTime || set.restTime < 0) {
        error.restTime = "Rest time cannot be negative.";
        errorFlag = true;
      }

      if (errorFlag) {
        _coreSetsErrors.push(error);
      }
    });

    const isProgramExerciseValid =
      Object.keys(_programExerciseErrors).length === 0;
    const isCoreSetsValid = Object.keys(_coreSetsErrors).length === 0;

    if (!isProgramExerciseValid) {
      setProgramExerciseErrors(_programExerciseErrors);
    } else {
      setProgramExerciseErrors(null);
    }
    if (!isCoreSetsValid) {
      setCoreSetsErrors(_coreSetsErrors);
    } else {
      setCoreSetsErrors(null);
    }

    return isProgramExerciseValid && isCoreSetsValid;
  };

  const restProgramExerciseToEdit = () => {
    setProgramExerciseToEdit(
      programExercise
        ? programExercise
        : programExerciseService.getEmpty(programExercisesLength)
    );
  };

  return {
    setProgramExerciseToEdit,
    handleSelectExercise,
    filterExercises,
    handleSets,
    onDaysChange,
    handleInputChange,
    handleSetChange,
    validateProgramExercise,
    programExerciseErrors,
    coreSetsErrors,
    programExerciseToEdit,
    exercises,
    restProgramExerciseToEdit,
  };
};
