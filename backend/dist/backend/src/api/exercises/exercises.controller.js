"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exerciseController = void 0;
const exercises_service_1 = require("./exercises.service");
const Error_service_1 = require("../../shared/services/Error.service");
const db_util_1 = require("../../shared/utils/db.util");
const exercise_validation_1 = require("../../../../shared/validations/exercise.validation");
const genericControllerFactory_1 = require("../../shared/generics/genericControllerFactory");
const exerciseGenericController = (0, genericControllerFactory_1.genericControllerFactory)({
    service: exercises_service_1.exerciseService,
    validation: exercise_validation_1.exerciseValidation,
    entityName: "Exercise",
    isAuth: false,
});
const getMuscles = async (_, res) => {
    try {
        const [muscles, count] = await exercises_service_1.exerciseService.getMuscles();
        const meta = db_util_1.dbUtil.buildMetaData({
            count,
        });
        res.setHeader("X-Total-Count", meta.total.toString());
        res.status(200).json({
            message: `muscles retrieved successfully`,
            data: muscles,
            meta,
        });
    }
    catch (error) {
        const { status, message, errors } = Error_service_1.AppError.handleResponse(error);
        res.status(status).json({ message, errors });
    }
};
const getEquipment = async (_, res) => {
    try {
        const [equipment, count] = await exercises_service_1.exerciseService.getEquipment();
        const meta = db_util_1.dbUtil.buildMetaData({
            count,
        });
        res.setHeader("X-Total-Count", meta.total.toString());
        res.status(200).json({
            message: `equipment retrieved successfully`,
            data: equipment,
            meta,
        });
    }
    catch (error) {
        const { status, message, errors } = Error_service_1.AppError.handleResponse(error);
        res.status(status).json({ message, errors });
    }
};
exports.exerciseController = {
    ...exerciseGenericController,
    getMuscles,
    getEquipment,
};
