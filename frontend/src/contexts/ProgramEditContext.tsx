import { createContext, useCallback, useEffect, useState } from "react";

import { useErrors } from "../hooks/shared/useErrors";
import { useProgramStore } from "../store/program.store";
import type {
  IProgramEditDTO,
  IProgramWorkoutEditDTO,
} from "../../../shared/models/program.model";
import { useNavigate } from "react-router";
import { programUtils } from "../utils/program.util";
import type { NavigateFunction } from "react-router";
import { formUtils } from "../utils/form.util";
import type { IDateRange } from "../models/calendar.model";

interface IProgramEditContext {
  programToEdit: IProgramEditDTO | null;
  isLoading: boolean;
  errors: Record<string, string> | null;
  handleDateSelect: (range: IDateRange) => void;
  onSaveProgram: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleProgramWorkouts: (programWorkout: IProgramWorkoutEditDTO) => void;
  deleteProgramWorkout: (id?: string) => void;
  navigate: NavigateFunction;
}

export const programEditContext = createContext<
  IProgramEditContext | undefined
>(undefined);

interface IProgramEditProviderProps {
  children: React.ReactNode;
  programId?: string;
}

export const ProgramEditProvider = ({
  children,
  programId,
}: IProgramEditProviderProps) => {
  const [programToEdit, setProgramToEdit] = useState<IProgramEditDTO | null>(
    null
  );
  const { errors, handleError } = useErrors<IProgramEditDTO>();

  const isLoading = useProgramStore(
    (state) => state.isLoadingId === programToEdit?.id
  );
  const getProgramById = useProgramStore((state) => state.getById);
  const saveProgram = useProgramStore((state) => state.saveItem);

  const navigate = useNavigate();

  //TODO?? Ugly refactor later
  useEffect(() => {
    getProgramById(programId)
      .then((program) => {
        if (!program) {
          setProgramToEdit(programUtils.getEmpty());
          return;
        }
        const programEdit = programUtils.dtoToEditDto(program);
        setProgramToEdit(programEdit);
      })
      .catch((error) => {
        handleError({ error });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programId]);

  const handleDateSelect = (range: IDateRange) => {
    setProgramToEdit((prev) => ({
      ...prev!,
      startDate: range.start,
      endDate: range.end,
    }));
  };

  const onSaveProgram = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        if (!programToEdit) {
          console.warn("No program to save"); //INFO debugging not for production
          return;
        }
        e.preventDefault();
        e.stopPropagation();

        const res = (await saveProgram(programToEdit)) as IProgramEditDTO;

        const { id } = res;
        navigate(`/programs/${id}`);
      } catch (error) {
        handleError({ error });
      }
    },
    [programToEdit]
  );

  const handleProgramWorkouts = useCallback(
    (programWorkout: IProgramWorkoutEditDTO) => {
      setProgramToEdit((prev) => {
        if (!prev) return null;
        const programWorkouts = prev?.programWorkouts ?? [];

        const idx = programWorkouts.findIndex(
          (pw) => pw.id === programWorkout.id
        );

        return {
          ...prev,
          programWorkouts:
            idx !== undefined && idx >= 0
              ? programWorkouts.toSpliced(idx, 1, programWorkout)
              : [...programWorkouts, programWorkout],
        };
      });
    },
    []
  );

  const deleteProgramWorkout = useCallback((id?: string) => {
    if (!id) return;
    setProgramToEdit((prev) => {
      if (!prev) return null;
      const programWorkouts = prev?.programWorkouts ?? [];
      const idx = programWorkouts.findIndex((pw) => pw.id === id);
      if (idx === -1) return prev;

      if (id.startsWith("temp/")) {
        return {
          ...prev,
          programWorkouts: programWorkouts.filter((pw) => pw.id !== id),
        };
      } else {
        programWorkouts[idx].crudOperation = "delete";
        return {
          ...prev,
          programWorkouts,
        };
      }
    });
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      formUtils.handleInputChange(e, setProgramToEdit);
    },
    []
  );

  return (
    <programEditContext.Provider
      value={{
        programToEdit,
        isLoading,
        errors,
        handleDateSelect,
        onSaveProgram,
        handleProgramWorkouts,
        deleteProgramWorkout,
        handleInputChange,
        navigate,
      }}
    >
      {children}
    </programEditContext.Provider>
  );
};
