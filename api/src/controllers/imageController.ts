import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { deleteImage, findImageById, updateImage } from '../models/imageModel';

const prisma = new PrismaClient();

// Handler para criar uma nova imagem
export const createImageHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const createImageBody = z.object({
    imageUrl: z.string()
  });

  const { imageUrl } = createImageBody.parse(request.body);

  const user = request.user as { userId: number };

  try {
    const newImage = await prisma.image.create({
      data: {
        imageUrl,
        uploadedById: user.userId,
      },
    });

    return reply.status(201).send({ newImage: newImage });
  } catch (error) {
    console.error('Erro ao criar imagem:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};

// Handler para obter todos as imagens
export const getAllImagesHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const images = await prisma.image.findMany({
      select: {
        id: true, // Inclua outros campos da imagem que desejar
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { posts: true }
        }
      }
    });

    const result = images.map(({ _count, ...image }) => ({
      ...image,
      postCount: _count.posts || 0
    }));

    return reply.status(200).send({ allImages: result });
  } catch (error) {
    console.error('Erro ao obter imagens:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};

// Handler para obter todos as imagens do usuario logado
export const getAllUserImagesHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = request.user as { userId: number };
    const images = await prisma.image.findMany({
      where: { uploadedById: user.userId },
      include: {
        posts: true
      }
    });

    return reply.status(200).send({ allImages: images });
  } catch (error) {
    console.error('Erro ao obter imagens:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};

// Handler para obter apenas uma imagem
export const getImageHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  try {
    const imageId = Number(id);

    const existingImage = await findImageById(imageId);

    if (!existingImage) {
      return reply.status(409).send({ error: 'Imagem não encontrada' });
    }

    const image = await prisma.image.findMany({
      where: { id: imageId }
    });

    return reply.status(200).send({ image: image });
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};

// Handler para atualizar uma imagem
export const updateImageHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  const updateImageBody = z.object({
    imageUrl: z.string()
  });

  const { imageUrl } = updateImageBody.parse(request.body);

  try {
    const imageId = Number(id);
    const existingImage = await findImageById(imageId);

    if (!existingImage) {
      return reply.status(404).send({ error: 'Imagem não encontrado' });
    }

    const updatedData: Partial<typeof existingImage> = {
      imageUrl
    };

    const updatedImage = await updateImage(imageId, updatedData);

    return reply.status(200).send({ updatedImage: updatedImage });
  } catch (error) {
    console.error('Erro ao atualizar imagem:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};

// Handler para deletar uma imagem
export const deleteImageHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  try {
    const imageId = Number(id);
    const existingImage = await findImageById(imageId);

    if (!existingImage) {
      return reply.status(404).send({ error: 'Imagem não encontrada' });
    }

    await deleteImage(imageId);

    return reply.status(200).send({ message: 'Imagem deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar imagem:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};
