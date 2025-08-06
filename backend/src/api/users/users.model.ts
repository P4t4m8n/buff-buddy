import { IEntity } from "../../../../shared/models/entity.model";



export interface IUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
}
