import { PrismaClient, Image } from '@prisma/client';

const prisma = new PrismaClient();

export const findImageById = async (id: number): Promise<Image | null> => {
  return prisma.image.findUnique({
    where: { id },
  });
};