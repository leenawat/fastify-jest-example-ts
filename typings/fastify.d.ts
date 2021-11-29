import { FastifyInstance } from "fastify";
import { Knex } from 'knex'

declare module "fastify" {
    interface FastifyRequest {
        user: any
        jwtVerify: any
    }
    interface FastifyInstance {
        jwt: any
        authenticate: any
        guard: any
    }
}