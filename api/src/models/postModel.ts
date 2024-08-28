import { PrismaClient, Post, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const findPostById = async (id: number): Promise<Post | null> => {
  return prisma.post.findUnique({
    where: { id },
  });
};

export const findPostBySlug = async (slug: string): Promise<Post | null> => {
  return prisma.post.findUnique({
    where: { slug },
  });
};

export const updatePost = async (id: number, data: Partial<Post>): Promise<Post> => {
  return prisma.post.update({
    where: { id },
    data,
  });
};

export const deletePost = async (id: number): Promise<Post> => {
  return prisma.post.delete({
    where: { id },
  });
};