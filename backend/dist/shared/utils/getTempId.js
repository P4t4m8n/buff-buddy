"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTempId = (prefix = "temp", item) => {
    if (item?.id) {
        return item.id;
    }
    return `${prefix}/${Math.random().toString(36).substring(2, 15)}`;
};
exports.default = getTempId;
