import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import UserModel from '../models/user'
import bcrypt from 'bcryptjs'
import Joi from 'joi'

export default async (fastify: FastifyInstance) => {
  const userModel = new UserModel(fastify.db)

  fastify.get('/api/users', async (request: FastifyRequest, reply: FastifyReply) => {
    return await userModel.select()
  })

  fastify.post('/api/users', {
    schema: {
      body: Joi.object({
        username: Joi.string().alphanum().min(4).max(20).required(),
        password: Joi.string().alphanum().min(6).max(20).required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required()
      }).required(),
    }
  }, async (request: FastifyRequest, reply: FastifyReply) => {
    const data: any = request.body
    data.password = bcrypt.hashSync(data.password, 10)
    await userModel.save(data)
    return 'User created'
  })
}