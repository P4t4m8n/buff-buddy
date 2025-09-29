import { IBaseFilter } from "../../../../shared/models/app.model";
import { PrismaPromise } from "../../../prisma/generated/prisma/runtime/library";
import { prisma } from "../../../prisma/prisma";
import { IApiService } from "../models/server.model";

const TABLE_KEYS = [
  "workout",
  "exercise",
  "program",
  "foodItem",
  "meal",
] as const;
type TableKey = (typeof TABLE_KEYS)[number];

const createServiceLogic = <
  Delegate extends {
    findMany: (...args: any) => PrismaPromise<any[]>;
    count: (...args: any) => PrismaPromise<number>;
    findUnique: (...args: any) => PrismaPromise<any | null>;
    create: (...args: any) => PrismaPromise<any>;
    update: (...args: any) => PrismaPromise<any>;
    delete: (...args: any) => PrismaPromise<any>;
  },
  CreateInput,
  UpdateInput,
  QuerySchema extends IBaseFilter
>(
  delegate: Delegate,
  util: any,
  sqlUtil: any
): IApiService<any, CreateInput, UpdateInput, QuerySchema> => {
  return {
    get: async (filter: QuerySchema) => {
      const where = util.buildWhereClause(filter);
      const take = filter.take ? parseInt(filter.take.toString()) : 10;
      const skip =
        filter.skip && filter.skip > 1 ? (filter.skip - 1) * take : 0;

      return await prisma.$transaction([
        delegate.findMany({ where, skip, take, select: sqlUtil.SELECT }),
        delegate.count({ where }),
      ]);
    },
    getById: async (id: string) => {
      return delegate.findUnique({
        where: { id },
        select: sqlUtil.SELECT,
      });
    },
    create: async (dto: CreateInput) => {
      return delegate.create({
        data: sqlUtil.getCreateData(dto),
        select: sqlUtil.SELECT,
      });
    },
    update: async (id: string, dto: UpdateInput) => {
      return delegate.update({
        where: { id },
        data: sqlUtil.getUpdateData(dto),
        select: sqlUtil.SELECT,
      });
    },
    remove: async (id: string) => {
      await delegate.delete({ where: { id } });
    },
  };
};

export const genericServiceFactory = <
  CreateInput extends { ownerId: string | null },
  UpdateInput extends { ownerId?: string | null },
  QuerySchema extends IBaseFilter
>({
  util,
  sqlUtil,
  tableKey,
}: {
  util: any;
  sqlUtil: any;
  tableKey: TableKey;
}) => {
  switch (tableKey) {
    case "workout":
      return createServiceLogic(prisma.workout, util, sqlUtil);
    case "exercise":
      return createServiceLogic(prisma.exercise, util, sqlUtil);
    case "program":
      return createServiceLogic(prisma.program, util, sqlUtil);
    case "foodItem":
      return createServiceLogic(prisma.foodItem, util, sqlUtil);
    case "meal":
      return createServiceLogic(prisma.meal, util, sqlUtil);
    default:
      const _exhaustiveCheck: never = tableKey;
      throw new Error(`Invalid table key: ${_exhaustiveCheck}`);
  }
};
