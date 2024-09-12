import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { createTag, deleteTag, findTagById, findTagByName, updateTag } from '../models/tagModel';

const prisma = new PrismaClient();

// Handler para criar uma nova tag
export const createTagHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const createTagBody = z.object({
    name: z.string()
  });

  const { name } = createTagBody.parse(request.body);

  try {
    const existingTag = await findTagByName(name);

    if (existingTag) {
      return reply.status(409).send({ error: 'Tag já existente' });
    }

    const tag = await createTag({
      name
    });

    return reply.status(201).send({ newTag: tag });
  } catch (error) {
    console.error('Erro ao criar tag:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};

// Handler para obter todas as tags
export const getAllTagsHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        posts: true
      }
    });

    return reply.status(200).send({ allTags: tags });
  } catch (error) {
    console.error('Erro ao obter tags:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};

// Handler para obter apenas uma tag
export const getTagHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  try {
    const tagId = Number(id);
    const existingTag = await findTagById(tagId);

    if (!existingTag) {
      return reply.status(404).send({ error: 'Tag não encontrada' });
    }
    const tag = await prisma.tag.findUnique({
      where: { id: tagId },
    });

    return reply.status(200).send({ tag: tag });
  } catch (error) {
    console.error('Erro ao obter tags:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};

// Handler para atualizar uma tag
export const updateTagHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  const updateTagBody = z.object({
    name: z.string()
  });

  const { name } = updateTagBody.parse(request.body);

  try {
    const tagId = Number(id);
    const existingTagId = await findTagById(tagId);

    if (!existingTagId) {
      return reply.status(404).send({ error: 'Tag não encontrada' });
    }
    
    const existingTagName = await findTagByName(name);

    if (existingTagName) {
      return reply.status(409).send({ error: 'Tag já existente' });
    }

    const updatedData: Partial<typeof existingTagId> = {
      name
    };

    const updatedTag = await updateTag(tagId, updatedData);

    return reply.status(200).send({ updatedTag: updatedTag });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};

// Handler para deletar uma tag
export const deleteTagHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  try {
    const tagId = Number(id);
    const existingTag = await findTagById(tagId);

    if (!existingTag) {
      return reply.status(404).send({ error: 'Tag não encontrado' });
    }

    // Verificar se a tag está vinculada a algum post
    const postsWithTag = await prisma.post.count({
      where: { tags: { some: { id: tagId } } },
    });

    if (postsWithTag) {
      return reply.status(400).send({ error: 'Tag está vinculada a um ou mais posts e não pode ser deletada' });
    }

    await deleteTag(tagId);

    return reply.status(200).send({ message: 'Tag deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar tag:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};
