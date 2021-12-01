/* eslint-disable @typescript-eslint/no-var-requires */
import fp from 'fastify-plugin'
import { FastifyRequest, FastifyReply } from 'fastify'
import config from 'config'

const jwtConfig: any = config.get('jwt')

export default fp(async (fastify: any, opts: any, done: any) => {
  fastify.register(require('fastify-jwt'), {
    secret: jwtConfig.secret
  })

  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
  done()
})
