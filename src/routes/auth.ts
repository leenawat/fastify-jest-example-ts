import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import UserModel from '../models/user'
import bcrypt from 'bcryptjs';

export default async (fastify: FastifyInstance) => {
  const userModel = new UserModel(fastify.db);

  fastify.get('/api/auth/me', {
    preValidation: [fastify.authenticate]
  }, async function (request, reply) {
    return request.user;
  });

  fastify.get('/api/auth/admin', {
    preValidation: [fastify.authenticate],
    preHandler: [fastify.guard.role(['admin'])]
  }, async function (request, reply) {
    return request.user;
  });

  fastify.post('/api/auth/sign-in', {
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
  }, async function (request, reply) {
    const data: any = request.body;
    const userDb: any = await userModel.findByUsername(data.username)
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
      lastName: userDb.last_name,
      roles: ['admin']
    }, {
      expiresIn: '10h'
    });
    reply.send({ token })
  })
}
