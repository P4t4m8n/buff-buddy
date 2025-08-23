import { IEntity } from "../../../../shared/models/entity.model";

export interface IUser extends IEntity {
  id: string;
  firstName: string | null;
  lastName: string | null;
}
