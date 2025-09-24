import { QUERY_KEYS } from "../../../consts/queryKeys.consts";
import { programService } from "../../../services/program.service";
import useQueryIdHook from "../../queryHooks/useQueryIdHook";

export default function useProgramIdQuery(id?: string) {
  const { data, isLoading } = useQueryIdHook({
    id,
    queryKey: QUERY_KEYS.PROGRAM_ID_QUERY_KEY,
    queryFn: programService.getById,
  });
  return { data, isLoading };
}
