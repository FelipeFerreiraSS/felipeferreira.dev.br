import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import {
  createUser,
  deleteUser as deleteUserModel,
  findUserByEmail,
  findUserById,
  updateUser,
} from '../models/userModel';

const prisma = new PrismaClient();

const saltRounds = 10;

// Handler para criar um novo usuário
export const createUserHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const createUserBody = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    type: z.string(),
    password: z.string(),
  });

  const { firstName, lastName, email, type, password } = createUserBody.parse(request.body);

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return reply.status(409).send({ error: 'Usuário já existe com este email' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await createUser({
      firstName,
      lastName,
      email,
      type,
      password: hashedPassword,
    });

    // Removendo a senha do objeto user antes de enviar na resposta
    const { password: _, ...userWithoutPassword } = user;

    return reply.status(201).send({ newUser: userWithoutPassword });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};

// Handler para obter todos os usuários
export const getAllUsersHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await prisma.user.findMany();

    // Removendo as senhas antes de enviar na resposta
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);

    return reply.status(200).send({ allUsers: usersWithoutPasswords });
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};

// Handler para obter apenas um usuários
export const getUserHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  try {
    const userId = Number(id);

    const existingUser = await findUserById(userId);

    if (!existingUser) {
      return reply.status(409).send({ error: 'Usuário não encontrado' });
    }

    const users = await prisma.user.findMany({
      where: { id: userId }
    });

    // Removendo as senhas antes de enviar na resposta
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);

    return reply.status(200).send({ user: usersWithoutPasswords });
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};

// Handler para a rota que retorna informações do usuário com base no token
export const getUserInfoHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const authHeader = request.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.status(401).send({ error: 'Token não fornecido ou formato inválido' });
  }

  const token = authHeader.substring(7); // Remove o "Bearer " do início

  try {
    const secretKey = process.env.SECRET_KEY_JWT as string;
    const decodedToken = jwt.verify(token, secretKey) as { userId: number };

    const user = await findUserById(decodedToken.userId);

    if (!user) {
      return reply.status(404).send({ error: 'Usuário não encontrado' });
    }

    // Removendo a senha do objeto user antes de enviar na resposta
    const { password: _, ...userWithoutPassword } = user;

    return reply.status(200).send({ user: userWithoutPassword });
  } catch (error) {
    console.error('Erro ao obter informações do usuário:', error);
    return reply.status(401).send({ error: 'Token inválido ou expirado' });
  }
};

// Handler para atualizar um usuário
export const updateUserHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  const updateUserBody = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    type: z.string().optional(),
    password: z.string().optional(),
  });

  const { firstName, lastName, email, type, password } = updateUserBody.parse(request.body);

  try {
    const userId = Number(id);
    const existingUser = await findUserById(userId);

    if (!existingUser) {
      return reply.status(404).send({ error: 'Usuário não encontrado' });
    }

    // Se o email está sendo atualizado, verificar se já existe outro usuário com o mesmo email
    if (email && email !== existingUser.email) {
      const userWithEmail = await findUserByEmail(email);
      if (userWithEmail) {
        return reply.status(409).send({ error: 'Outro usuário já existe com este email' });
      }
    }

    const updatedData: Partial<typeof existingUser> = {
      firstName,
      lastName,
      email,
      type,
    };

    if (password) {
      updatedData.password = await bcrypt.hash(password, saltRounds);
    }

    const updatedUser = await updateUser(userId, updatedData);

    // Removendo a senha do objeto user antes de enviar na resposta
    const { password: _, ...userWithoutPassword } = updatedUser;

    return reply.status(200).send({ updatedUser: userWithoutPassword });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};

// Handler para deletar um usuário
export const deleteUserHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  try {
    const userId = Number(id);
    const existingUser = await findUserById(userId);

    if (!existingUser) {
      return reply.status(404).send({ error: 'Usuário não encontrado' });
    }

    await deleteUserModel(userId);

    return reply.status(200).send({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};
