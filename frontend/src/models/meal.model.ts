import type { IMealDTO } from "../../../shared/models/meal.model";
import type { IItemPreviewProps } from "./UI.model";

export type TMealActionRoute = "dietEdit" | "mealList";

export interface IMealPreviewProps
  extends IItemPreviewProps<IMealDTO, TMealActionRoute> {}
