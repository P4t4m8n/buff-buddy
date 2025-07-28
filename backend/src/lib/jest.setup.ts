import { server } from "../server";
process.env.NODE_ENV = "test";
afterAll((done) => {
  if (server.listening) {
    server.close(done);
  } else {
    done();
  }
});
