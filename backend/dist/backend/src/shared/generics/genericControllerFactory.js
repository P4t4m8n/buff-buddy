"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericControllerFactory = void 0;
const Error_service_1 = require("../services/Error.service");
const localStorage_middleware_1 = require("../../middlewares/localStorage.middleware");
const util_validation_1 = require("../../../../shared/validations/util.validation");
const db_util_1 = require("../utils/db.util");
const genericControllerFactory = ({ service, validation, entityName, isAuth, buildDTO, }) => {
    return {
        getAll: async (req, res) => {
            try {
                let userId = undefined;
                if (isAuth)
                    userId = _authUser();
                const filter = validation.QuerySchema.parse(req.query);
                const [itemsData, count] = await service.get(filter, userId);
                const meta = db_util_1.dbUtil.buildMetaData({
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
            }
            catch (error) {
                const { status, message, errors } = Error_service_1.AppError.handleResponse(error);
                res.status(status).json({ message, errors });
            }
        },
        getById: async (req, res) => {
            try {
                let userId = undefined;
                if (isAuth)
                    userId = _authUser();
                const validatedId = _validateId(req.params.id);
                const itemData = await service.getById(validatedId, userId);
                if (!itemData) {
                    throw new Error_service_1.AppError(`${entityName} not found`, 404);
                }
                const dto = buildDTO && itemData ? buildDTO(itemData) : itemData;
                res.status(200).json({
                    message: `${entityName} retrieved successfully`,
                    data: dto,
                });
            }
            catch (error) {
                const { status, message, errors } = Error_service_1.AppError.handleResponse(error);
                res.status(status).json({ message, errors });
            }
        },
        create: async (req, res) => {
            try {
                const userId = _authUser();
                const invalidatedData = req.body;
                const validatedData = validation
                    .createFactorySchema({ toSanitize: true })
                    .parse(invalidatedData);
                if (userId !== validatedData.ownerId) {
                    throw Error_service_1.AppError.create(`Cannot create ${entityName} for another user`, 403);
                }
                const itemData = await service.create(validatedData);
                const dto = buildDTO ? buildDTO(itemData) : itemData;
                res.status(201).json({
                    message: `${entityName} created successfully`,
                    data: dto,
                });
            }
            catch (error) {
                const { status, message, errors } = Error_service_1.AppError.handleResponse(error);
                res.status(status).json({ message, errors });
            }
        },
        update: async (req, res) => {
            try {
                const userId = _authUser();
                const id = _validateId(req.params.id);
                const validatedData = validation
                    .updateFactorySchema({ toSanitize: true })
                    .parse(req.body);
                if (userId !== validatedData?.ownerId) {
                    throw Error_service_1.AppError.create(`Cannot update ${entityName} for another user`, 403);
                }
                const itemData = await service.update(id, validatedData, userId);
                const dto = buildDTO ? buildDTO(itemData) : itemData;
                res.status(200).json({
                    message: `${entityName} updated successfully`,
                    data: dto,
                });
            }
            catch (error) {
                const { status, message, errors } = Error_service_1.AppError.handleResponse(error);
                res.status(status).json({ message, errors });
            }
        },
        remove: async (req, res) => {
            try {
                const userId = _authUser();
                const validatedId = util_validation_1.validationUtil
                    .IDSchemaFactory({ toSanitize: true })
                    .parse(req.params.id);
                await service.remove(validatedId, userId);
                res.status(200).json({
                    message: `${entityName} deleted successfully`,
                    data: null,
                });
            }
            catch (error) {
                const { status, message, errors } = Error_service_1.AppError.handleResponse(error);
                res.status(status).json({ message, errors });
            }
        },
    };
};
exports.genericControllerFactory = genericControllerFactory;
const _authUser = () => {
    const userId = localStorage_middleware_1.asyncLocalStorage.getStore()?.sessionUser?.id;
    if (!userId) {
        throw new Error_service_1.AppError("User not authenticated", 401);
    }
    return userId;
};
const _validateId = (id) => {
    return util_validation_1.validationUtil.IDSchemaFactory({ toSanitize: true }).parse(id);
};
