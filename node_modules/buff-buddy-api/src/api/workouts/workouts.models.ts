import { DaysOfWeek } from "../../../prisma/generated/prisma";
import { IBaseFilter } from "../../shared/models/base.model";

export interface IWorkoutFilter extends IBaseFilter {
  programId?: string;
  dayOfWeek?: DaysOfWeek;
  exerciseId?: string;
  isCompleted?: boolean;
}
