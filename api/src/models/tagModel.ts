import { PrismaClient, Tag, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const findTagById = async (id: number): Promise<Tag | null> => {
  return prisma.tag.findUnique({
    where: { id },
  });
};

export const findTagByName = async (name: string): Promise<Tag | null> => {
  return prisma.tag.findUnique({
    where: { name },
  });
};

export const createTag = async (data: Prisma.TagCreateInput): Promise<Tag | null> => {
  return prisma.tag.create({
    data
  })
}

export const updateTag = async (id: number, data: Partial<Tag>): Promise<Tag | null> => {
  return prisma.tag.update({
    where: { id },
    data,
  })
}

export const deleteTag = async (id: number): Promise<Tag | null> => {
  return prisma.tag.delete({
    where: { id }
  })
}