import type { IBaseFilter } from "../models/app.model";
import type { IEntity } from "../models/entity.model";

type TEntityType = "exercise" | "user" | "program";

export const storageService = {
  async get<T>(
    entityType: TEntityType,
    filter?: IBaseFilter,
    delay = 100
  ): Promise<T[]> {
    const entities = query<T>(entityType);
    // const skip = filter?.skip ?? 0;
    // const page = filter?.page ?? 1;
    // if (skip || page) {
    //   const startIdx = (page - 1) * skip;
    //   const endIdx = startIdx + skip;
    //   entities = entities.slice(startIdx, endIdx);
    // }
    if (delay) {
      return new Promise((resolve) => setTimeout(resolve, delay, entities));
    }
    return entities;
  },

  async getById<T extends IEntity>(
    entityType: TEntityType,
    id: string
  ): Promise<T> {
    const entities = query<T>(entityType);
    const entity = entities?.find((entity) => entity.id === id);
    if (!entity)
      throw new Error(
        `Cannot get, Item ${id} of type: ${entityType} does not exist`
      );
    return entity;
  },

  async post<T>(entityType: TEntityType, newEntity: T): Promise<T> {
    console.log(newEntity)
    newEntity = { ...newEntity, id: makeId() };
    const entities = query<T>(entityType);
    entities.push(newEntity);
    _save(entityType, entities);
    return Promise.resolve(newEntity);
  },

  async put<T extends IEntity>(
    entityType: TEntityType,
    updatedEntity: T
  ): Promise<T> {
    const entities = query<T>(entityType);
    const idx = entities.findIndex((entity) => entity.id === updatedEntity.id);
    entities[idx] = updatedEntity;
    _save(entityType, entities);
    return updatedEntity;
  },

  async remove<T extends IEntity>(
    entityType: TEntityType,
    id: string
  ): Promise<void> {
    const entities = query<T>(entityType);
    const idx = entities.findIndex((entity) => entity.id === id);
    if (idx !== -1) entities.splice(idx, 1);
    else
      throw new Error(
        `Cannot remove, item ${id} of type: ${entityType} does not exist`
      );
    _save(entityType, entities);
    return Promise.resolve();
  },
};

const _save = <T>(entityType: string, entities: T[]) => {
  localStorage.setItem(entityType, JSON.stringify(entities));
};

const query = <T>(entityType: TEntityType): T[] => {
  return JSON.parse(localStorage.getItem(entityType) || "null") || [];
};

const makeId = (length = 5) => {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
};
