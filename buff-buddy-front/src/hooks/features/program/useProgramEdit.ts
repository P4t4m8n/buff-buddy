import { useEffect, useState, type ChangeEvent } from "react";
import type { IProgramEditDTO } from "../../../models/program.model";
import type {
  IProgramExerciseEditDTO,
  TProgramExerciseEditRecord,
} from "../../../models/programExercise.model";
import type { IDateRange } from "../../../models/calendar.model";
import { useProgramStore } from "../../../store/program.store";
import { useNavigate } from "react-router";
import { programUtils } from "../../../utils/program.util";

interface IProgramEditHook {
  programToEdit: IProgramEditDTO | null;
  isLoading: boolean;
  handleDateSelect: (range: IDateRange) => void;
  onSaveProgram: (e: React.FormEvent<HTMLFormElement>) => void;
  handleProgramExercise: (programExercise: IProgramExerciseEditDTO) => void;
  groupProgramExercisesByDay: (
    pe: IProgramExerciseEditDTO[]
  ) => TProgramExerciseEditRecord;
  navigate: ReturnType<typeof useNavigate>;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const useProgramEdit = (id?: string): IProgramEditHook => {
  const [programToEdit, setProgramToEdit] = useState<IProgramEditDTO | null>(
    null
  );
  const isLoading = useProgramStore((state) => state.isLoading);
  const getProgramById = useProgramStore((state) => state.getProgramById);
  const saveProgram = useProgramStore((state) => state.saveProgram);
  const navigate = useNavigate();

  //TODO?? Ugly refactor later
  useEffect(() => {
    getProgramById(id).then((program) => {
      if (!program) {
        setProgramToEdit(programUtils.getEmpty());
        return
      }
      setProgramToEdit(program);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDateSelect = (range: IDateRange) => {
    setProgramToEdit((prev) => ({
      ...prev!,
      startDate: range.start,
      endDate: range.end,
    }));
  };

  const onSaveProgram = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const notes = formData.get("notes") as string;
    const isActive = formData.get("isActive") === "on";
    const programToSave = { ...programToEdit, name, notes, isActive };
    const res = await saveProgram(programToSave);
    if (!res) {
      console.error("Failed to save program");
      return;
    }

    const { id } = res;
    navigate(`/programs/${id}`);
  };

  //TODO?? improve logic, specially change of order
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

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value } = e.target;
    setProgramToEdit((prev) => {
      if (!prev) return null;
      // Only use checked for checkboxes
      if (type === "checkbox" && "checked" in e.target) {
        return {
          ...prev,
          [name]: (e.target as HTMLInputElement).checked,
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return {
    programToEdit,
    isLoading,
    handleDateSelect,
    onSaveProgram,
    handleProgramExercise,
    navigate,
    groupProgramExercisesByDay,
    handleInputChange,
  };
};
