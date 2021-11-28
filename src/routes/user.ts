import { Knex } from 'knex'
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { userModel } from '../models/user';

export default async (fastify: FastifyInstance) => {
  const db: Knex = fastify.db;
  const UserModel = new userModel();
  fastify.get('/api/users', async (request: FastifyRequest, reply: FastifyReply) => {
    return await UserModel.select(db);
  })

  fastify.post('/api/users', async (request: FastifyRequest, reply: FastifyReply) => {
    const data = request.body;
    console.log({ body: request.body })
    await UserModel.save(db, data);
    return "User created";
  })
}