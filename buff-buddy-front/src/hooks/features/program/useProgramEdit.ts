import { useEffect, useState, type ChangeEvent } from "react";
import type {
  IProgramEditDTO,
  TProgramWorkoutEditRecord,
} from "../../../../../shared/models/program.model";
import type { IDateRange } from "../../../models/calendar.model";
import { useProgramStore } from "../../../store/program.store";
import { useNavigate } from "react-router";
import { programUtils } from "../../../utils/program.util";
import type {
  IWorkoutDTO,
  IWorkoutEditDTO,
} from "../../../models/workout.model";
import type { THttpErrorResponse } from "../../../services/api.service";

interface IProgramEditHook {
  programToEdit: IProgramEditDTO | null;
  isLoading: boolean;
  error: THttpErrorResponse | null;
  handleDateSelect: (range: IDateRange) => void;
  onSaveProgram: (e: React.FormEvent<HTMLFormElement>) => void;
  handleWorkouts: (workout: IWorkoutDTO) => void;
  groupWorkoutsByDay: (workout: IWorkoutDTO[]) => TProgramWorkoutEditRecord;
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
  const error = useProgramStore((state) => state.error);

  const navigate = useNavigate();

  //TODO?? Ugly refactor later
  useEffect(() => {
    getProgramById(id).then((program) => {
      if (!program) {
        setProgramToEdit(programUtils.getEmpty());
        return;
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
  const handleWorkouts = (workout: IWorkoutEditDTO) => {
    setProgramToEdit((prev) => {
      if (!prev) return null;
      const programExercises = prev?.workouts ?? [];

      const idx = prev?.workouts?.findIndex((w) => w.id === workout.id);

      return {
        ...prev,
        workouts:
          idx !== undefined && idx >= 0
            ? programExercises.toSpliced(idx, 1, workout)
            : [...programExercises, workout],
      };
    });
  };

  const groupWorkoutsByDay = (workouts: IWorkoutDTO[]) => {
    const peByDay: TProgramWorkoutEditRecord = {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    };
    workouts.forEach((workout) => {
      workout.daysOfWeek?.forEach((day) => {
        if (!peByDay[day]) {
          peByDay[day] = [];
        }
        peByDay[day].push(workout);
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
    handleWorkouts,
    navigate,
    groupWorkoutsByDay,
    handleInputChange,
    error,
  };
};
