import { useEffect, useState } from "react";
import type { IProgramEditDTO } from "../../../models/program.model";
import type {
  IProgramExerciseEditDTO,
  TProgramExerciseEditRecord,
} from "../../../models/programExercise.model";
import type { IDateRange } from "../../../models/calendar.model";
import { useProgramStore } from "../../../store/program.store";

interface IProgramEditHook {
  programToEdit: IProgramEditDTO | null;
  isLoading: boolean;
  handleDateSelect: (range: IDateRange) => void;
  onSaveProgram: (e: React.FormEvent<HTMLFormElement>) => void;
  handleProgramExercise: (programExercise: IProgramExerciseEditDTO) => void;
  groupProgramExercisesByDay: (
    pe: IProgramExerciseEditDTO[]
  ) => TProgramExerciseEditRecord;
}

export const useProgramEdit = (id?: string): IProgramEditHook => {
  const [programToEdit, setProgramToEdit] = useState<IProgramEditDTO | null>(
    null
  );
  const isLoading = useProgramStore((state) => state.isLoading);
  const getProgramById = useProgramStore((state) => state.getProgramById);
  const saveProgram = useProgramStore((state) => state.saveProgram);

  //TODO?? Ugly refactor later
  useEffect(() => {
    getProgramById(id).then((program) => {
      if (!program) {
        return;
      }
      setProgramToEdit(program);
    });
  }, [id]);

  const handleDateSelect = (range: IDateRange) => {
    setProgramToEdit((prev) => ({ ...prev!, dateRange: range }));
  };

  const onSaveProgram = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const note = formData.get("note") as string;
    const isActive = formData.get("isActive") === "on";
    const programToSave = { ...programToEdit, name, note, isActive };
    saveProgram(programToSave);
  };

  const handleProgramExercise = (programExercise: IProgramExerciseEditDTO) => {
    setProgramToEdit((prev) => {
      if (!prev) return null;
      const programExercises = prev?.programExercises ?? [];

      const idx = prev?.programExercises?.findIndex(
        (ex) => ex.id === programExercise.id
      );

      // Check if this a new item and its not an update of a new item
      if (
        (idx === undefined || idx === -1) &&
        programExercise?.crudOperation === "create"
      ) {
        return {
          ...prev,
          programExercises: [...programExercises, programExercise],
        };
      }

      if (idx === undefined || idx === -1) {
        return prev;
      }

      return {
        ...prev,
        programExercises: programExercises
          .toSpliced(idx!, 1, programExercise)
          .sort((a, b) => a.order - b.order)
          .map((ex, i) => {
            const isChangeOrder = ex.order !== i + 1;

            if (!isChangeOrder || ex.crudOperation === "delete") return ex;
            return {
              ...ex,
              order: i + 1,
              crudOperation:
                ex.crudOperation !== "create" ? "update" : ex.crudOperation,
            };
          }),
      };
    });
  };

  const groupProgramExercisesByDay = (pe: IProgramExerciseEditDTO[]) => {
    const peByDay: TProgramExerciseEditRecord = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };
    pe.forEach((programExercise) => {
      programExercise.daysOfWeek?.forEach((day) => {
        if (!peByDay[day]) {
          peByDay[day] = [];
        }
        peByDay[day].push(programExercise);
      });
    });
    return peByDay;
  };

  return {
    programToEdit,
    isLoading,
    handleDateSelect,
    onSaveProgram,
    handleProgramExercise,
    groupProgramExercisesByDay,
  };
};
