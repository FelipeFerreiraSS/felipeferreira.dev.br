import { PrismaClient, Post, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const findPostById = async (id: number): Promise<Post | null> => {
  return prisma.post.findUnique({
    where: { id },
  });
};

export const deletePost = async (id: number): Promise<Post> => {
  return prisma.post.delete({
    where: { id },
  });
};