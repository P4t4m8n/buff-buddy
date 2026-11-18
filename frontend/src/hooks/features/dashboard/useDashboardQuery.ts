import { useQuery } from "@tanstack/react-query";

import { dashboardService } from "../../../services/dashboard.service";
import { useAuthStore } from "../../../store/auth.store";

import { QUERY_KEYS } from "../../../consts/queryKeys.consts";

//INFO: Not cached like the list queries, the stats change after every logged workout
export const useDashboardQuery = () => {
  const userId = useAuthStore((state) => state.user?.id);

  return useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD_QUERY_KEY, userId],
    queryFn: dashboardService.getDashboard,
    enabled: !!userId,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
