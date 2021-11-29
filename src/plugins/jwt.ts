import fp from 'fastify-plugin'
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import config from 'config';

const jwtConfig:any = config.get('jwt');

export default fp(async (fastify:any, opts:any, done:any) => {
    fastify.register(require("fastify-jwt"), {
        secret: jwtConfig.secret
      })

      fastify.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          await request.jwtVerify()
        } catch (err) {
          reply.send(err)
        }
      })
    done()
})

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
    export interface FastifyRequest {
        jwtVerify: any;
    }
    export interface FastifyInstance {
        jwt: any;
    }
}
