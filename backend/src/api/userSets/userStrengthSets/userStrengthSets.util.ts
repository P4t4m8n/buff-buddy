import { IUserStrengthSetDTO } from "../../../../../shared/models/userStrengthSet.model";
import { IUserStrengthSet } from "./userStrengthSets.model";

//INFO:At at moment Model and DTO are the same, split into function to match code structure and for feature implantation
const buildDTO = (data: IUserStrengthSet): IUserStrengthSetDTO => {
  return data;
};

export const userStrengthSetsUtil = {
  buildDTO,
};
