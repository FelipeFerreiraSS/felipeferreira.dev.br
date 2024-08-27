import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

export const createPostHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const createPostBody = z.object({
    authorId: z.number(),
    title: z.string(),
    slug: z.string().min(1).max(255),
    published: z.boolean().optional(),
    headerImageId: z.number().optional(),
    summary: z.string(),
    content: z.string(),
    tags: z.array(z.string()).optional(),
  });

  const { authorId, title, slug, published = false, headerImageId, summary, content, tags } = createPostBody.parse(request.body);

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        slug,
        published,
        headerImageId,
        summary,
        content,
        tags: {
          connectOrCreate: tags?.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })) || [],
        },
        authorId,
      },
    });

    return reply.status(201).send({ newPost: newPost });
  } catch (error) {
    console.error('Erro ao criar post:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};