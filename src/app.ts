import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

app.post('/orgs', async (request: FastifyRequest, reply: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    author_name: z.string(),
    email: z.string(),
    whatsapp: z.string(),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    street: z.string(),
    password: z.string(),
  })

  const {
    author_name: authorName,
    cep,
    city,
    email,
    name,
    state,
    street,
    whatsapp,
    password,
  } = registerBodySchema.parse(request.body)

  const org = await prisma.org.create({
    data: {
      author_name: authorName,
      cep,
      city,
      email,
      name,
      password,
      state,
      street,
      whatsapp,
    },
  })

  return reply.status(201).send({ org })
})
