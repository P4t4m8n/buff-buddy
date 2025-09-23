import { useEffect, useState, type ChangeEvent } from "react";
import type {
  IProgramDTO,
  IProgramEditDTO,
  IProgramWorkoutEditDTO,
} from "../../../../../shared/models/program.model";
import type { IDateRange } from "../../../models/calendar.model";

import { programUtil } from "../../../utils/program.util";
import { useErrors } from "../../shared/useErrors";
import { formUtil } from "../../../utils/form.util";
import { useMutationKeyStore } from "../../../store/mutationKeys.store";
import useProgramIdQuery from "../../queryHooks/features/program/useProgramIdQuery";
import useItemMutation from "../../queryHooks/useItemMutation";
import { QUERY_KEYS } from "../../../consts/queryKeys.consts";
import { programService } from "../../../services/program.service";

// interface IProgramEditHook {
//   programToEdit: IProgramEditDTO | null;
//   isLoading: boolean;
//   errors: Partial<Record<keyof IProgramEditDTO, string>> | null;
//   handleDateSelect: (range: IDateRange) => void;
//   onSaveProgram: (e: React.FormEvent<HTMLFormElement>) => void;
//   handleProgramWorkouts: (workout: IProgramWorkoutEditDTO) => void;
//   navigate: ReturnType<typeof useNavigate>;
//   handleInputChange: (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => void;
//   deleteProgramWorkout: (id?: string) => void;
// }

export const useProgramEdit = (programId?: string) => {
  const [programToEdit, setProgramToEdit] = useState<IProgramEditDTO | null>(
    null
  );

  const mutationKey = useMutationKeyStore((store) => store.programsMutationKey);
  const { errors, mutateAsync } = useItemMutation<IProgramEditDTO, IProgramDTO>(
    {
      listKey: mutationKey,
      itemIdKey: [QUERY_KEYS.PROGRAM_ID_QUERY_KEY, programId ?? ""],
      saveFn: programService.save,
      filterFn: (oldItem, savedItem) => oldItem.id === savedItem.id,
    }
  );
  const { handleError } = useErrors<IProgramEditDTO>();
  const { data, isLoading } = useProgramIdQuery(programId);


  useEffect(() => {
    const programData = data?.data;
    const foodItem =
      programId && programData
        ? programUtil.dtoToEditDto(programData)
        : programUtil.getEmpty();
    setProgramToEdit(foodItem);
    return;
  }, [programId, data]);

  const handleDateSelect = (range: IDateRange) => {
    setProgramToEdit((prev) => ({
      ...prev!,
      startDate: range.start,
      endDate: range.end,
    }));
  };

  const saveProgram = async () => {
    try {
      if (!programToEdit) {
        console.warn("No program to save"); //INFO debugging not for production
        return;
      }

      const { data } = await mutateAsync(programToEdit);

      const { id } = data;
      return id;
    } catch (error) {
      handleError({ error });
    }
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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    formUtil.handleInputChange(e, setProgramToEdit);
  };

  return {
    programToEdit,
    isLoading,
    errors,
    handleDateSelect,
    saveProgram,
    handleInputChange,
    handleProgramWorkouts,
    deleteProgramWorkout,
  };
};
