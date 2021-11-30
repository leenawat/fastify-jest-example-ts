import { FastifyPluginAsync } from 'fastify'

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/healthcheck', async function (request, reply) {
    return { healthcheck: true }
  })
}

export default example
