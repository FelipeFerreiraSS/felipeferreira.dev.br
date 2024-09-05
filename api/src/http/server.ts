import fastify from 'fastify'
import dotenv from 'dotenv';
import cors from '@fastify/cors';
require('dotenv').config();

import { authRoutes } from '../routes/authRoutes';
import { userRoutes } from '../routes/userRoutes';
import { postRoutes } from '../routes/postRoutes';
import { imageRoutes } from '../routes/imageRoutes';
import { tagRoutes } from '../routes/tagRoutes';

const app = fastify()

const port = 3333

dotenv.config();

app.register(cors, {
  origin: 'https://felipeferreiradev.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});

app.get('/', async (request, reply) => {
  return reply.status(200).send({ message: 'Servidor rodando!!! 🚀🚀🚀🚀' });
});

app.register(authRoutes);
app.register(userRoutes);
app.register(postRoutes);
app.register(imageRoutes);
app.register(tagRoutes);

app.listen({ port }).then(() => {
  console.log(`Server rodando na porta: ${port}`)
})