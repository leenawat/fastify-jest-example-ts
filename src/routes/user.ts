import { Knex } from 'knex'
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { userModel } from '../models/user';
import bcrypt from 'bcryptjs';

export default async (fastify: FastifyInstance) => {
  const db: Knex = fastify.db;
  const UserModel = new userModel();
  fastify.get('/api/users', async (request: FastifyRequest, reply: FastifyReply) => {
    return await UserModel.select(db);
  })

  fastify.post('/api/users', {
    schema: {
      body: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            minLength: 6,
            maxLength: 20
          },
          password: {
            type: 'string',
            minLength: 6,
            maxLength: 20
          }
        },
        required: ["username", "password"],
        additionalProperties: true,
      },
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    const data: any = request.body;
    data.password = bcrypt.hashSync(data.password, 10);
    await UserModel.save(db, data);
    return "User created";
  }) 
}