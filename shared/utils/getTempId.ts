import type { IEntity } from "../models/entity.model";

export const getTempId = <T extends IEntity>(prefix = "temp", item?: T) => {
  if (item?.id) {
    return item.id;
  }
  return `${prefix}/${Math.random().toString(36).substring(2, 15)}`;
};
