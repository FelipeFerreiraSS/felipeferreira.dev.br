import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

export const createImageHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const createImageBody = z.object({
    image: z.string()
  });

  const { image } = createImageBody.parse(request.body);

  try {
    const newImage = await prisma.image.create({
      data: {
        image,
      },
    });

    return reply.status(201).send({ newImage: newImage });
  } catch (error) {
    console.error('Erro ao criar imagem:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};