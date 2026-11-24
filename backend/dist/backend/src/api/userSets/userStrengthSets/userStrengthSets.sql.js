"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStrengthSetsSQL = void 0;
const getCreateUserStrengthSet = (dto) => {
    return {
        reps: dto.reps,
        weight: dto.weight,
        isCompleted: dto.isCompleted,
        isWarmup: dto.isWarmup,
        isMuscleFailure: dto.isMuscleFailure,
        isJointPain: dto.isJointPain,
        order: dto?.order,
        skippedReason: dto?.skippedReason,
    };
};
const CORE_STRENGTH_SET_SELECT = {
    id: true,
    reps: true,
    weight: true,
    isWarmup: true,
    isCompleted: true,
    isMuscleFailure: true,
    isJointPain: true,
    skippedReason: true,
    order: true,
};
exports.userStrengthSetsSQL = {
    getCreateUserStrengthSet,
    CORE_STRENGTH_SET_SELECT,
};
