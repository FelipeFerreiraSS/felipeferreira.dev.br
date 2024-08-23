import fastify from 'fastify'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const app = fastify()

const port = 3333

const prisma = new PrismaClient()

app.post('/users', async (request, reply) => {
  const createUserBody = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string()
  }) 

  const { firstName, lastName, email, password } = createUserBody.parse(request.body)

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      type : "administrador",
      password,
    }
  })

  return reply.status(201).send({ newUser: user })
})

app.get('/users', async (request, reply) => {
  try {
    const users = await prisma.user.findMany()
    return reply.status(200).send({ allUsers: users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return reply.status(500).send({ error: 'Internal Server Error' })
  }
})

app.listen({ port }).then(() => {
  console.log(`Server rodando na porta: ${port}`)
})