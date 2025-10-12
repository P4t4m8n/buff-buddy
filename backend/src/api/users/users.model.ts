import { IModel } from "../../shared/models/db.model";

export interface IUser extends IModel {
  firstName: string | null;
  lastName: string | null;
  email?: string | null;
  imgUrl?: string | null;
}
