import { IEntity } from "../models/entity.model";

export const getTempId = (prefix = "temp", item?: IEntity) => {
  if (item?.id) {
    return item.id;
  }
  return `${prefix}/${Math.random().toString(36).substring(2, 15)}`;
};
