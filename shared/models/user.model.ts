import type { IEntity } from "./entity.model";
export interface IUserDTO extends IEntity {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  imgUrl?: string | null;
}
