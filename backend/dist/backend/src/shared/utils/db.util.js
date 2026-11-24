"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbUtil = void 0;
const cleanData = (obj) => {
    const cleaned = {};
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (value !== null &&
            typeof value === "object" &&
            !Array.isArray(value) &&
            typeof value !== "string" &&
            !(value instanceof Date)) {
            const cleanedNested = cleanData(value);
            if (Object.keys(cleanedNested).length > 0) {
                cleaned[key] = cleanedNested;
            }
        }
        else if (value !== undefined && value !== "" && value !== null) {
            cleaned[key] = value;
        }
    });
    return cleaned;
};
const buildMetaData = ({ count, take, skip, }) => ({
    total: count,
    totalPages: Math.ceil(count / (take ?? 10)),
    currentPage: skip ?? 0,
    perPage: take ?? 10,
});
const buildSkipTakeClause = (filter) => {
    const take = filter.take ? parseInt(filter.take.toString()) : 10;
    const skip = (filter?.skip ?? 0) * take;
    return {
        take,
        skip,
    };
};
exports.dbUtil = {
    cleanData,
    buildMetaData,
    buildSkipTakeClause,
};
