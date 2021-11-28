const knex = require('knex');
import fp from "fastify-plugin";

module.exports = fp(async (fastify: any, opts: any, done: any) => {
    const connection = await knex({
        client: 'mysql2',
        connection: {
            port: 3306,
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'fastify-jest-example'
        }
    })
    fastify.decorate("db", connection)
    done()
})