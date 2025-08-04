import { IUserCardioSetDTO } from "../../../../../shared/models/cardioSet.model";
import { IUserCardioSet } from "./userCardioSets.model";

//INFO:At at moment Model and DTO are the same, split into function to match code structure and for feature implantation
const buildDTO = (data: IUserCardioSet): IUserCardioSetDTO => {
  return data;
};

export const userCardioSetsUtils = {
  buildDTO,
};
