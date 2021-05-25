const fastify = require("fastify")({
  logger: false,
});

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

fastify.get("/:second", async (request, reply) => {
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
