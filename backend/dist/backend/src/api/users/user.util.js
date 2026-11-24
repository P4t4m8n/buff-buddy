"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUtil = void 0;
const toSmallDTO = (user) => ({
    id: user?.id,
    firstName: user?.firstName,
    lastName: user?.lastName,
});
exports.userUtil = {
    toSmallDTO,
};
