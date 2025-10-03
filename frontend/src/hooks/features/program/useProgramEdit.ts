//Core
import { useEffect } from "react";
//Services
import { programService } from "../../../services/program.service";
//Utils
import { programUtil } from "../../../utils/program.util";
import { formUtil } from "../../../utils/form.util";
//Hooks
import { useErrors } from "../../shared/useErrors";
import { useProgramIdQuery } from "./useProgramIdQuery";
import { useItemEdit } from "../../shared/useItemEdit";
//Consts
import { QUERY_KEYS } from "../../../consts/queryKeys.consts";
//Types
import type {
  IProgramDTO,
  IProgramEditDTO,
  IProgramWorkoutEditDTO,
} from "../../../../../shared/models/program.model";
import type { IDateRange } from "../../../models/calendar.model";

export const useProgramEdit = (programId?: string) => {
  const {
    itemToEdit: programToEdit,
    setItemToEdit: setProgramToEdit,
    mutateAsync,
    mutationErrors,
    queryError,
    isLoading,
    isSaving,
  } = useItemEdit<IProgramEditDTO, IProgramDTO>({
    itemId: programId,
    storeMutationKey: QUERY_KEYS.PROGRAM_MUTATION_KEY,
    queryIdKey: QUERY_KEYS.PROGRAM_ID_QUERY_KEY,
    saveFn: programService.save,
    useIdQuery: useProgramIdQuery,
    dtoToEditDto: programUtil.dtoToEditDto,
    getEmpty: programUtil.getEmpty,
  });

  const { handleError } = useErrors<IProgramDTO>();

  useEffect(() => {
    if (queryError) handleError({ error: queryError, emitToToast: true });
  }, [queryError]);

  const handleDateSelect = (range: IDateRange) => {
    setProgramToEdit((prev) => ({
      ...prev!,
      startDate: range.start,
      endDate: range.end,
    }));
  };

  const saveProgram = async () => {
    if (!programToEdit) return false;
    const { data } = await mutateAsync(programToEdit);

    const { id } = data;
    return id;
  };

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

  const deleteProgramWorkout = (id?: string) => {
    setProgramToEdit((prev) => {
      if (!prev) return null;
      const programWorkouts = prev?.programWorkouts ?? [];
      const idx = programWorkouts.findIndex((pw) => pw.id === id);
      if (idx === -1) return prev;

      if (id?.startsWith("temp/")) {
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
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    formUtil.handleInputChange(e, setProgramToEdit);
  };

  return {
    programToEdit,
    isSaving,
    isLoading,
    mutationErrors,
    handleDateSelect,
    saveProgram,
    handleInputChange,
    handleProgramWorkouts,
    deleteProgramWorkout,
  };
};
