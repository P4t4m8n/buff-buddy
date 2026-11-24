"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TEST_NAMES = ["userWorkout"];
const getUserCredentials = ({ testName }) => ({
    email: `test-${testName}-${Date.now()}@example.com`,
    password: "Password123!",
    confirmPassword: "Password123!",
    firstName: `test-${testName}`,
    lastName: "API",
});
const testUtil = { getUserCredentials };
exports.default = testUtil;
