"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSQL = void 0;
const PASSWORD_AUTH_SELECT = { passwordHash: true, googleId: true };
//INFO: At the moment do nothing, exist for structure and when moving to vanilla SQL
const getAuthCreate = (dto) => {
    return dto;
};
exports.authSQL = { getAuthCreate, PASSWORD_AUTH_SELECT };
