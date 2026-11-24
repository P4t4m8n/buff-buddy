"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
process.env.NODE_ENV = "test";
afterAll((done) => {
    if (server_1.server.listening) {
        server_1.server.close(done);
    }
    else {
        done();
    }
});
