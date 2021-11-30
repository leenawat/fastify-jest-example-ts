import fp from 'fastify-plugin'
import FastifyGuard from 'fastify-guard'

export default fp(async (fastify: any, opts: any, done: any) => {
    fastify.register(FastifyGuard, {
        roleProperty: 'roles',
    })
    done()
})
