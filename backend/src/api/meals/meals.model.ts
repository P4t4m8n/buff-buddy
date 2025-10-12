import { MealType } from "../../../prisma/generated/prisma";
import { IModel } from "../../shared/models/db.model";
import { IUser } from "../users/users.model";

export interface IMeal extends IModel {
  name?: string | null;
  mealType?: MealType;
  ownerId?: string | null;
  owner?: IUser;
  notes?: string | null;
}
