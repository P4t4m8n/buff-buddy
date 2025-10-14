import type { IID } from "./entity.model";
export interface IUserDTO extends IID {
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  imgUrl?: string | null;
}
