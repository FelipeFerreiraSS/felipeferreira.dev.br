import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { deletePost, findPostById } from '../models/postModel';

const prisma = new PrismaClient();

// Handler para criar um post
export const createPostHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const createPostBody = z.object({
    title: z.string(),
    slug: z.string().min(1).max(255),
    published: z.boolean().optional(),
    headerImageId: z.number().optional(),
    summary: z.string(),
    content: z.string(),
    tags: z.array(z.string()).optional(),
  });

  const { title, slug, published = false, headerImageId, summary, content, tags } = createPostBody.parse(request.body);

  const user = request.user as { userId: number };

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
        authorId: user.userId,
      },
    });

    return reply.status(201).send({ newPost: newPost });
  } catch (error) {
    console.error('Erro ao criar post:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
};

// Handler para obter todos os posts
export const getAllPostsHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const posts = await prisma.post.findMany()

    return reply.status(200).send({ allPosts: posts })
  } catch (error) {
    console.error('Erro ao obter posts:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

export const deletePostHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string }

  try {
    const postId = Number(id);

    const existingPost = findPostById(postId)

    if (!existingPost) {
      return reply.status(404).send({ error: 'Post não encontrado' });
    }

    await deletePost(postId)

    return reply.status(200).send({ message: 'Post deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}