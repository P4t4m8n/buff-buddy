import type { UseQueryResult } from "@tanstack/react-query";
import type { IExerciseDTO } from "../../../shared/models/exercise.model";
import type { THttpResponse } from "./apiService.model";

export type TExerciseActionRoute = "workoutEdit" | "exerciseList";

export interface IExercisePreviewProps {
  item: IExerciseDTO;
  actionType?: TExerciseActionRoute;
  deleteItem: (id?: string) => Promise<void>;
  selectExercise?: (exercise?: IExerciseDTO) => void;
}

export interface IUseExerciseInfoListProps<DTO, Filter> {
  queryHook(
    filter?: Filter | null
  ): UseQueryResult<THttpResponse<DTO[]>, Error>;
  filter?: Filter | null;
}
