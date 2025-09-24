import type {
  IProgramDTO,
  IProgramFilter,
} from "../../../../../shared/models/program.model";
import { QUERY_KEYS } from "../../../consts/queryKeys.consts";
import { programService } from "../../../services/program.service";
import { useQueryHook } from "../../queryHooks/useQueryHook";

export const useProgramsQuery = (filter: IProgramFilter | null) => {
  return useQueryHook<IProgramDTO, IProgramFilter>({
    queryKey: [QUERY_KEYS.PROGRAMS_QUERY_KEY, filter],
    queryFn: () => programService.get(filter),
    enabled: !!filter,
  });
};
