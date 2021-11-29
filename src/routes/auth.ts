import { FastifyInstance, FastifyPluginAsync } from 'fastify'
import UserModel from '../models/user'
import bcrypt from 'bcryptjs';
import Joi from 'joi'

export default async (fastify: FastifyInstance) => {
  const userModel = new UserModel(fastify.db);

  fastify.get('/api/auth/me', {
    schema: {
      tags: ['auth'],
      security: [{ bearer: [] }]
    },
    preValidation: [fastify.authenticate]
  }, async function (request, reply) {
    return request.user;
  });

  fastify.get('/api/auth/admin', {
    schema: {
      tags: ['auth'],
      security: [{ bearer: [] }]
    }
  }, async function (request, reply) {
    return request.user;
  });

  fastify.post('/api/auth/sign-in', {
    schema: {
      tags: ['auth'],
      body: Joi.object({
        username: Joi.string().alphanum().min(4).max(20).required(),
        password: Joi.string().alphanum().min(6).max(20).required()
      }).required(),
    }
  }, async function (request, reply) {
    const data: any = request.body;
    const userDb: any = await userModel.findByUsername(data.username)
    if (!userDb) {
      reply.code(401).send({ message: 'Incorrect credentials' })
    } else {
      const result = bcrypt.compareSync(data.password, userDb.password);
      if (!result) {
        reply.code(401).send({ message: 'Incorrect credentials' })
      } else {
        const token = fastify.jwt.sign({
          username: userDb.username,
          firstName: userDb.first_name,
          lastName: userDb.last_name,
          roles: ['admin']
        }, {
          expiresIn: '10h'
        });
        reply.send({ token })
      }
    }
  })
}
