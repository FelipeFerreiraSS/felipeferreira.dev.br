import fastify from 'fastify'
import dotenv from 'dotenv';
require('dotenv').config();

import { authRoutes } from '../routes/authRoutes';
import { userRoutes } from '../routes/userRoutes';

const app = fastify()

const port = 3333

dotenv.config();

app.register(authRoutes);
app.register(userRoutes);

app.listen({ port }).then(() => {
  console.log(`Server rodando na porta: ${port}`)
})