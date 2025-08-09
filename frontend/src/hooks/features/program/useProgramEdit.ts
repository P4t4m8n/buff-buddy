import { useEffect, useState, type ChangeEvent } from "react";
import type {
  IProgramEditDTO,
  IProgramWorkoutEditDTO,
} from "../../../../../shared/models/program.model";
import type { IDateRange } from "../../../models/calendar.model";
import { useProgramStore } from "../../../store/program.store";
import { useNavigate } from "react-router";
import { programUtils } from "../../../utils/program.util";
import { useErrors } from "../../shared/useErrors";

interface IProgramEditHook {
  programToEdit: IProgramEditDTO | null;
  isLoading: boolean;
  errors: Partial<Record<keyof IProgramEditDTO, string>> | null;
  handleDateSelect: (range: IDateRange) => void;
  onSaveProgram: (e: React.FormEvent<HTMLFormElement>) => void;
  handleProgramWorkouts: (workout: IProgramWorkoutEditDTO) => void;
  navigate: ReturnType<typeof useNavigate>;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const useProgramEdit = (id?: string): IProgramEditHook => {
  const [programToEdit, setProgramToEdit] = useState<IProgramEditDTO | null>(
    null
  );
  const { errors, handleError } = useErrors<IProgramEditDTO>();

  const isLoading = useProgramStore((state) => state.isLoading);
  const getProgramById = useProgramStore((state) => state.getProgramById);
  const saveProgram = useProgramStore((state) => state.saveProgram);

  const navigate = useNavigate();

  //TODO?? Ugly refactor later
  useEffect(() => {
    getProgramById(id).then((program) => {
      if (!program) {
        setProgramToEdit(programUtils.getEmpty());
        return;
      }
      const programEdit = programUtils.dtoToEditDto(program);
      setProgramToEdit(programEdit);
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
    try {
      e.preventDefault();
      e.stopPropagation();
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const notes = formData.get("notes") as string;
      const isActive = formData.get("isActive") === "on";
      const programToSave = { ...programToEdit, name, notes, isActive };
      const res = await saveProgram(programToSave);

      const { id } = res;
      navigate(`/programs/${id}`);
    } catch (error) {
      handleError(error);
    }
  };

  //TODO?? improve logic, specially change of order
  const handleProgramWorkouts = (programWorkout: IProgramWorkoutEditDTO) => {
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
    errors,
    handleDateSelect,
    onSaveProgram,
    navigate,
    handleInputChange,
    handleProgramWorkouts,
  };
};
