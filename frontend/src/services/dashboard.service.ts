import { apiService } from "./api.service";

import type { IDashboardDTO } from "../../../shared/models/dashboard.model";
import type { THttpResponse } from "../models/apiService.model";

const ROOT_PATH = "/dashboard" as const;

const getDashboard = (): Promise<THttpResponse<IDashboardDTO>> => {
  return apiService.get<IDashboardDTO>(ROOT_PATH);
};

export const dashboardService = {
  getDashboard,
};
