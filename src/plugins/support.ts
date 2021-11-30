import fp from 'fastify-plugin'

// to export the decorators to the outer scope
export default fp(async (fastify, opts) => {
  fastify.decorate('someSupport', function () {
    return 'hugs'
  })
})

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    someSupport(): string;
  }
}
