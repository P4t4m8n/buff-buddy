import type { IUser } from "./users.model";

const toSmallDTO = (user?: IUser | null) => ({
  id: user?.id,
  firstName: user?.firstName,
  lastName: user?.lastName,
});

export const userUtil = {
  toSmallDTO,
};
