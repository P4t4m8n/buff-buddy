import { IEntity } from "../../../../shared/models/entity.model";

export interface IUserBase extends IEntity {
  firstName?: string | null;
  lastName?: string | null;
}

export interface IUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
}
