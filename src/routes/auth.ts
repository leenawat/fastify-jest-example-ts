import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { Knex } from 'knex';
import { userModel } from '../models/user'
import bcrypt from 'bcryptjs';

export default async (fastify: FastifyInstance) => {
  const db: Knex = fastify.db;
  const UserModel = new userModel();
  fastify.post('/api/auth/sign-in', {
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
  }, async function (request, reply) {
    const data: any = request.body;
    const userDb: any = await UserModel.findByUsername(db, data.username)
    if (!userDb) {
      reply.code(401).send({ message: 'Incorrect credentials' })
    }
    const result = bcrypt.compareSync(data.password, userDb.password);
    if (!result) {
      reply.code(401).send({ message: 'Incorrect credentials' })
    }
    const token = fastify.jwt.sign({
      username: userDb.username,
      firstName: userDb.first_name,
      lastName: userDb.last_name
    });
    reply.send({ token })
  })
}