const fastify = require("fastify")({
  logger: false,
});
const axios = require("axios");
fastify.register(require("fastify-rate-limit"), {
  max: 10,
  timeWindow: 1000,
});
const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const send_request = async () => {
  try {
    const abc = await axios.get("http://127.0.0.1:3010/v1/test");
  } catch (error) {
    console.log(error);
  }
  return;
};
fastify.get("/", async (request, reply) => {
  setInterval(() => {
    new Promise((resolve, reject) => {
      // send_request();
      resolve();
    });
  }, 4000);

  return {
    hello: "world",
    elapsedTime: 4 + " seconds",
  };
});
fastify.get("/code/:code", async (request, reply) => {
  let code = Number(request.params.code) || 200;

  return reply.code(code).send({
    hello: "world",
    resultCode: `status code: ${code}`,
  });
});
fastify.get("/:second", async (request, reply) => {
  if (Number(request.params.second) > 30 || Number(request.params.second) < 0) {
    return {
      code: 500,
      reason: "not allow to be < 30 or > 0",
    };
  }
  if (request.params.second) {
    await timeout(Number(request.params.second) * 1000);
  } else {
    await timeout(5000);
  }

  return {
    hello: "world",
    elapsedTime: `${request.params.second} seconds` || 5 + " seconds",
  };
});

const start = async () => {
  try {
    await fastify.listen(3015, () => console.log("Server started at 3015 🚀 "));
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
