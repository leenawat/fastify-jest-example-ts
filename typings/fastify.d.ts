import { FastifyInstance } from "fastify";
import { Knex } from 'knex'

declare module "fastify" {
    interface FastifyRequest {
        user: any;
        jwtVerify: any;
    }
    interface FastifyInstance {
        jwt: any
        authenticate: any
        guard: any
    }

    interface FastifySchema {
        tags?: unknown;
        security?: unknown;
        description?: unknown;
        body?: unknown;
        querystring?: unknown;
        params?: unknown;
        headers?: unknown;
        response?: unknown;
        validate?: any;
        validateAsync?: any;
    }

}