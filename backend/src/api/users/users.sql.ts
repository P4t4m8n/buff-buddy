import { Prisma } from "../../../prisma/generated/prisma";

const SMALL_USER_SELECT: Prisma.UserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  imgUrl: true,
};

export const userSQL = {
  SMALL_USER_SELECT,
};
