"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCardioSetsSQL = void 0;
const getCreateUserCardioSet = (dto) => {
    return {
        workTime: dto.workTime,
        avgHeartRate: dto.avgHeartRate,
        avgSpeed: dto.avgSpeed,
        distance: dto.distance,
        caloriesBurned: dto.caloriesBurned,
        isCompleted: dto.isCompleted,
        skippedReason: dto.skippedReason,
        order: dto.order,
    };
};
const CORE_CARDIO_SET_SELECT = {
    id: true,
    workTime: true,
    avgHeartRate: true,
    avgSpeed: true,
    distance: true,
    caloriesBurned: true,
    isCompleted: true,
    skippedReason: true,
    order: true,
};
exports.userCardioSetsSQL = {
    getCreateUserCardioSet,
    CORE_CARDIO_SET_SELECT,
};
