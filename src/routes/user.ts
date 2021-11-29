import { Knex } from 'knex'
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { MyUserModel } from '../models/user';
import bcrypt from 'bcryptjs';

export default async (fastify: FastifyInstance) => {
  const userModel = new MyUserModel(fastify.db);

  fastify.get('/api/users', async (request: FastifyRequest, reply: FastifyReply) => {
    return await userModel.select();
  })

  fastify.post('/api/users', {
    schema: {
      body: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            minLength: 4,
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
    await userModel.save(data);
    return "User created";
  }) 
}