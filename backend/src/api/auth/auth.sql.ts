import { Prisma } from "../../../prisma/generated/prisma";

const PASSWORD_AUTH_SELECT = { passwordHash: true, googleId: true };

//INFO: At the moment do nothing, exist for structure and when moving to vanilla SQL
const getAuthCreate = (dto: Prisma.UserCreateInput) => {
  return dto;
};

export const authSQL = { getAuthCreate, PASSWORD_AUTH_SELECT };
