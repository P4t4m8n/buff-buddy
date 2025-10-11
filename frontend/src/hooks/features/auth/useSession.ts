//Lib
import { useQuery } from "@tanstack/react-query";
//Services
import { authService } from "../../../services/auth.service";
//Consts
import { MAX_AGE } from "../../../../../shared/consts/auth.const";

export const useSession = () => {
  return useQuery({
    queryKey: ["sessionUser"],
    queryFn: () => authService.getSessionUser(),
    staleTime: MAX_AGE,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
