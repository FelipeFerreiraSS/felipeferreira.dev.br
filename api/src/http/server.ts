import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
require('dotenv').config();

const app = fastify()

const port = 3333

const prisma = new PrismaClient()

const saltRounds = 10

declare module 'fastify' {
  interface FastifyRequest {
    user?: string | JwtPayload;
  }
}

// Middleware para verificar o token JWT
const authenticateJWT = (request: FastifyRequest, reply: FastifyReply, next: Function) => {
  const authHeader = request.headers['authorization'];

  if (!authHeader) {
    return reply.status(401).send({ error: 'Missing authentication token' });
  }

  const token = authHeader.split(' ')[1];
  const secretKey = process.env.SECRET_KEY_JWT as string;

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return reply.status(401).send({ error: 'Token expired' });
      }
      if (err.name === 'JsonWebTokenError') {
        return reply.status(401).send({ error: 'Invalid token' });
      }
      return reply.status(403).send({ error: 'Token verification failed' });
    }

    request.user = user;
    next();
  });
};

app.post('/users', { preHandler: [authenticateJWT] }, async (request, reply) => {
  const createUserBody = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    type: z.string(),
    password: z.string()
  }) 

  const { firstName, lastName, email, type, password } = createUserBody.parse(request.body)

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return reply.status(409).send({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        type,
        password: hashedPassword,
      }
    })

    return reply.status(201).send({ newUser: user })
  } catch (error) {
    console.error('Error creating user:', error)
    return reply.status(500).send({ error: 'Internal Server Error' })
  }
})

app.put('/users/:id', { preHandler: [authenticateJWT] }, async (request, reply) => {
  const updateUserBody = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
  });

  const { id } = request.params as { id: string };
  const { firstName, lastName, email, password } = updateUserBody.parse(request.body);

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    });

    return reply.status(200).send({ updatedUser: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
});

app.delete('/users/:id', { preHandler: [authenticateJWT] }, async (request, reply) => {
  const { id } = request.params as { id: string }

  try {

    const existingUser = await prisma.user.findUnique({
      where: {
        id: Number(id)
      }
    })

    if (!existingUser) {
      return reply.status(404).send({ error: 'User not found' })
    }

    await prisma.user.delete({
      where: {
        id: Number(id)
      }
    })

    return reply.status(200).send({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return reply.status(500).send({ error: 'Internal Server Error' })
  }
})


app.get('/users', { preHandler: [authenticateJWT] }, async (request, reply) => {
  try {
    const users = await prisma.user.findMany()
    return reply.status(200).send({ allUsers: users })
  } catch (error) {
    console.error('Error fetching users:', error)
    return reply.status(500).send({ error: 'Internal Server Error' })
  }
})

app.post('/login', async (request, reply) => {
  const { email, password } = request.body as { email: string, password: string }
  
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if (!user) {
    return reply.status(401).send({ error: 'Email or password is incorrect' })
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    return reply.status(401).send({ error: 'Email or password is incorrect' })
  }

  const secretKey = process.env.SECRET_KEY_JWT as string

  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' })

  const { password: _, ...data } = user;

  return reply.status(200).send({ message: 'Login successful!!!', token: token, user: data })
})

app.listen({ port }).then(() => {
  console.log(`Server rodando na porta: ${port}`)
})