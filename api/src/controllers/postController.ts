import { FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { deletePost, findPostById, findPostBySlug, updatePost } from '../models/postModel';
import { findImageById } from '../models/imageModel';

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

  const existingPost = await findPostBySlug(slug);
  
  if (existingPost) {
    return reply.status(404).send({ error: 'Um post com esse slug já existe.' });
  }

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
    const posts = await prisma.post.findMany({
      include: {
        headerImage: true,
        tags: true,
      },
    })

    return reply.status(200).send({ allPosts: posts })
  } catch (error) {
    console.error('Erro ao obter posts:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

// Handler para obter apenas um posts
export const getPostHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  try {
    const postId = Number(id);

    const existingPost = await findPostById(postId);

    if (!existingPost) {
      return reply.status(404).send({ error: 'Post não encontrado' });
    }

    const post = await prisma.post.findMany({
      where: { id: postId },
      include: {
        headerImage: true,
        tags: true,
      },
    })

    return reply.status(200).send({ post: post })
  } catch (error) {
    console.error('Erro ao obter posts:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

// Handler para obter apenas os posts do usuario logado
export const getUserPostHandler = async (request: FastifyRequest, reply: FastifyReply) => {

  try {
    const user = request.user as { userId: number };

    const posts = await prisma.post.findMany({
      where: { authorId: user.userId },
      include: {
        headerImage: true,
        tags: true,
      },
    })

    return reply.status(200).send({ userPosts: posts })
  } catch (error) {
    console.error('Erro ao obter posts:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

// Handler para obter apenas um posts publicado
export const getPublishedPostHandler = async (request: FastifyRequest, reply: FastifyReply) => {

  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: {
        headerImage: true,
        tags: true,
      },
    })

    return reply.status(200).send({ publishedPosts: posts })
  } catch (error) {
    console.error('Erro ao obter posts:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

// Handler para atualizar um usuário
export const updatePostHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  const updatePostBody = z.object({
    title: z.string(),
    slug: z.string().min(1).max(255),
    published: z.boolean().optional(),
    headerImageId: z.number().optional(),
    summary: z.string(),
    content: z.string(),
    tags: z.array(z.string()).optional(),
  });

  const { title, slug, published = false, headerImageId, summary, content, tags } = updatePostBody.parse(request.body);

  try {
    const postId = Number(id);
    const existingPost = await findPostById(postId);

    if (!existingPost) {
      return reply.status(404).send({ error: 'Post não encontrado' });
    }

    if (slug && slug !== existingPost.slug) {
      const userWithSlug = await findPostBySlug(slug);
      if (userWithSlug) {
        return reply.status(409).send({ error: 'Outro post já existe com este slug' });
      }
    }

    const imageId = Number(headerImageId);
    const existingImage = await findImageById(imageId);

    if (!existingImage) {
      return reply.status(404).send({ error: 'Imagem não encontrada' });
    }

    const updatedData: Partial<typeof existingPost> = {
      title,
      slug,
      published,
      headerImageId,
      summary,
      content,
    };

    await updatePost(postId, updatedData);

    // Atualizando as tags associadas, se forem fornecidas
    if (tags) {
      // Primeiro, removemos todas as tags atuais associadas ao post
      await prisma.post.update({
        where: { id: postId },
        data: {
          tags: {
            set: [], // Remove todas as tags atuais
          },
        },
      });

      // Em seguida, associamos as novas tags ao post
      const tagConnect = tags.map((tag) => ({
        where: { name: tag },
        create: { name: tag },
      }));

      await prisma.post.update({
        where: { id: postId },
        data: {
          tags: {
            connectOrCreate: tagConnect,
          },
        },
      });
    }

    const postWithTags = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        tags: true,
      },
    });

    return reply.status(200).send({ updatedPost: postWithTags });
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}

// Handler para deletar um post
export const deletePostHandler = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string }

  try {
    const postId = Number(id);

    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        tags: true,
        headerImage: true,
      },
    });

    if (!existingPost) {
      return reply.status(404).send({ error: 'Post não encontrado' });
    }

     // Verificando as tags associadas ao post
     const tags = existingPost.tags;
     for (const tag of tags) {
       const postsWithTag = await prisma.post.count({
         where: {
           tags: {
             some: {
               id: tag.id,
             },
           },
         },
       });
 
       // Se a tag estiver associada apenas a este post, deletá-la
       if (postsWithTag === 1) {
         await prisma.tag.delete({
           where: {
             id: tag.id,
           },
         });
       }
     }
 
     // Verificando a imagem do cabeçalho associada ao post
     const headerImageId = existingPost.headerImageId;
     if (headerImageId) {
       const postsWithHeaderImage = await prisma.post.count({
         where: {
           headerImageId: headerImageId,
         },
       });
 
       // Se a imagem estiver associada apenas a este post, deletá-la
       if (postsWithHeaderImage === 1) {
         await prisma.image.delete({
           where: {
             id: headerImageId,
           },
         });
       }
     }

    await deletePost(postId)

    return reply.status(200).send({ message: 'Post deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    return reply.status(500).send({ error: 'Erro interno do servidor' });
  }
}