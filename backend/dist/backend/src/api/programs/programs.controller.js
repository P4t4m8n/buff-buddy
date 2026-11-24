"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.programsController = void 0;
const programs_service_1 = require("./programs.service");
const program_validations_1 = require("../../../../shared/validations/program.validations");
const genericControllerFactory_1 = require("../../shared/generics/genericControllerFactory");
exports.programsController = (0, genericControllerFactory_1.genericControllerFactory)({
    service: programs_service_1.programsService,
    validation: program_validations_1.programValidation,
    entityName: "Program",
    isAuth: true,
});
