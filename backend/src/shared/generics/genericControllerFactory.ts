import { AppError } from "../services/Error.service";

import { asyncLocalStorage } from "../../middlewares/localStorage.middleware";

import { validationUtil } from "../../../../shared/validations/util.validation";

import type { IApiService } from "../models/server.model";
import type { IValidation } from "../../../../shared/models/validation.model";
import type { Request, Response } from "express";
import { IGetMetaData } from "../../../../shared/models/metaData.model";
import { dbUtil } from "../utils/db.util";
import { IBaseFilter } from "../../../../shared/models/app.model";

export const genericControllerFactory = <
  DTO,
  EditDTO,
  Filter,
  CreateInput extends { ownerId: string | null },
  UpdateInput extends { ownerId?: string | null },
  QuerySchema extends IBaseFilter,
  Model
>({
  service,
  validation,
  entityName,
  isAuth,
  buildDTO,
}: {
  service: IApiService<Model, CreateInput, UpdateInput, QuerySchema>;
  validation: IValidation<
    EditDTO,
    Filter,
    CreateInput,
    UpdateInput,
    QuerySchema
  >;
  entityName: string;
  isAuth?: boolean;
  buildDTO?: (data: Model) => DTO;
}) => {
  return {
    getAll: async (req: Request, res: Response) => {
      try {
        let userId = undefined;
        
        if (isAuth) userId = _authUser();
        
        const filter = validation.QuerySchema.parse(req.query);
        
        const [itemsData, count] = await service.get(filter, userId);

        const meta: IGetMetaData = dbUtil.buildMetaData({
          count,
          take: filter.take,
          skip: filter.skip,
        });

        res.setHeader("X-Total-Count", meta.total.toString());
        res.setHeader("X-Total-Pages", meta.totalPages.toString());
        res.setHeader("X-Current-Page", meta.currentPage.toString());
        res.setHeader("X-Per-Page", meta.perPage.toString());

        const dtos = buildDTO
          ? itemsData.map((item) => buildDTO(item))
          : itemsData;

        res.status(200).json({
          message: `${entityName}s retrieved successfully`,
          data: dtos,
          meta,
        });
      } catch (error) {
        const { status, message, errors } = AppError.handleResponse(error);
        res.status(status).json({ message, errors });
      }
    },

    getById: async (req: Request, res: Response) => {
      try {
        let userId = undefined;

        if (isAuth) userId = _authUser();

        const validatedId = _validateId(req.params.id);

        const itemData = await service.getById(validatedId, userId);

        if (!itemData) {
          throw new AppError(`${entityName} not found`, 404);
        }
        const dto = buildDTO && itemData ? buildDTO(itemData) : itemData;

        res.status(200).json({
          message: `${entityName} retrieved successfully`,
          data: dto,
        });
      } catch (error) {
        const { status, message, errors } = AppError.handleResponse(error);
        res.status(status).json({ message, errors });
      }
    },

    create: async (req: Request, res: Response) => {
      try {
        const userId = _authUser();

        const invalidatedData = req.body;

        const validatedData = validation
          .createFactorySchema({ toSanitize: true })
          .parse(invalidatedData);

        if (userId !== validatedData.ownerId) {
          throw AppError.create(
            `Cannot create ${entityName} for another user`,
            403
          );
        }

        const itemData = await service.create(validatedData);

        const dto = buildDTO ? buildDTO(itemData) : itemData;

        res.status(201).json({
          message: `${entityName} created successfully`,
          data: dto,
        });
      } catch (error) {
        const { status, message, errors } = AppError.handleResponse(error);
        res.status(status).json({ message, errors });
      }
    },

    update: async (req: Request, res: Response) => {
      try {
        const userId = _authUser();

        const id = _validateId(req.params.id);

        const validatedData = validation
          .updateFactorySchema({ toSanitize: true })
          .parse(req.body);

        if (userId !== validatedData?.ownerId) {
          throw AppError.create(
            `Cannot update ${entityName} for another user`,
            403
          );
        }

        const itemData = await service.update(id, validatedData);

        const dto = buildDTO ? buildDTO(itemData) : itemData;

        res.status(200).json({
          message: `${entityName} updated successfully`,
          data: dto,
        });
      } catch (error) {
        const { status, message, errors } = AppError.handleResponse(error);
        res.status(status).json({ message, errors });
      }
    },

    remove: async (req: Request, res: Response) => {
      try {
        const validatedId = validationUtil
          .IDSchemaFactory({ toSanitize: true })
          .parse(req.params.id);

        await service.remove(validatedId);

        res.status(200).json({
          message: `${entityName} deleted successfully`,
          data: null,
        });
      } catch (error) {
        const { status, message, errors } = AppError.handleResponse(error);
        res.status(status).json({ message, errors });
      }
    },
  };
};

const _authUser = () => {
  const userId = asyncLocalStorage.getStore()?.sessionUser?.id;

  if (!userId) {
    throw new AppError("User not authenticated", 401);
  }

  return userId;
};

const _validateId = (id: string): string => {
  return validationUtil.IDSchemaFactory({ toSanitize: true }).parse(id);
};
