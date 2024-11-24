import { FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../models/userModel';
import { z } from 'zod';

export const loginHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const loginBody = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = loginBody.parse(request.body);

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return reply.status(401).send({ error: 'Email ou senha estão incorretos' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return reply.status(401).send({ error: 'Email ou senha estão incorretos' });
    }

    const secretKey = process.env.SECRET_KEY_JWT as string;

    const token = jwt.sign({ userId: user.id, type: user.type }, secretKey, { expiresIn: '5h' });

    // Removendo a senha do objeto user antes de enviar na resposta
    const { password: _, ...userWithoutPassword } = user;

    return reply.status(200).send({
      message: 'Login bem-sucedido!',
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Erro no login:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};
