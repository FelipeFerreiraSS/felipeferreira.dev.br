import { PrismaClient, Image } from '@prisma/client';

const prisma = new PrismaClient();

export const findImageById = async (id: number): Promise<Image | null> => {
  return prisma.image.findUnique({
    where: { id },
  });
};

export const updateImage = async (id: number, data: Partial<Image>): Promise<Image> => {
  return prisma.image.update({
    where: { id },
    data,
  });
};

export const deleteImage = async (id: number): Promise<Image | null> => {
  return prisma.image.delete({
    where: { id },
  });
};