const fastify = require('fastify')({
  logger: true
})

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


fastify.get('/', async (request, reply) => {
	if (request

	await timeout(3000);

  return { hello: 'world' }
})

const start = async () => {
  try {
    await fastify.listen(3015)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
