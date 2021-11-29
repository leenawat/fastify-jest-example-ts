import fp from 'fastify-plugin'
import { FastifyRequest, FastifyReply } from 'fastify';

export default fp(async (fastify: any, opts: any, done: any) => {
    fastify.register(require('fastify-guard'), {
        roleProperty: "roles",
        // errorHandler: (result: any, req: FastifyRequest, reply: FastifyReply) => {
        //     return reply.send('you are not allowed to call this route')
        // }
    })
    done()
})
