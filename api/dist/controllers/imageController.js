"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageHandler = exports.updateImageHandler = exports.getImageHandler = exports.getAllUserImagesHandler = exports.getAllImagesHandler = exports.createImageHandler = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const imageModel_1 = require("../models/imageModel");
const prisma = new client_1.PrismaClient();
// Handler para criar uma nova imagem
const createImageHandler = async (request, reply) => {
    const createImageBody = zod_1.z.object({
        imageUrl: zod_1.z.string()
    });
    const { imageUrl } = createImageBody.parse(request.body);
    const user = request.user;
    try {
        const newImage = await prisma.image.create({
            data: {
                imageUrl,
                uploadedById: user.userId,
            },
        });
        return reply.status(201).send({ newImage: newImage });
    }
    catch (error) {
        console.error('Erro ao criar imagem:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.createImageHandler = createImageHandler;
// Handler para obter todos as imagens
const getAllImagesHandler = async (request, reply) => {
    try {
        const images = await prisma.image.findMany({
            include: {
                posts: true
            }
        });
        return reply.status(200).send({ allImages: images });
    }
    catch (error) {
        console.error('Erro ao obter imagens:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.getAllImagesHandler = getAllImagesHandler;
// Handler para obter todos as imagens do usuario logado
const getAllUserImagesHandler = async (request, reply) => {
    try {
        const user = request.user;
        const images = await prisma.image.findMany({
            where: { uploadedById: user.userId },
            include: {
                posts: true
            }
        });
        return reply.status(200).send({ allImages: images });
    }
    catch (error) {
        console.error('Erro ao obter imagens:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.getAllUserImagesHandler = getAllUserImagesHandler;
// Handler para obter apenas uma imagem
const getImageHandler = async (request, reply) => {
    const { id } = request.params;
    try {
        const imageId = Number(id);
        const existingImage = await (0, imageModel_1.findImageById)(imageId);
        if (!existingImage) {
            return reply.status(409).send({ error: 'Imagem não encontrada' });
        }
        const image = await prisma.image.findMany({
            where: { id: imageId }
        });
        return reply.status(200).send({ image: image });
    }
    catch (error) {
        console.error('Erro ao obter usuários:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.getImageHandler = getImageHandler;
// Handler para atualizar uma imagem
const updateImageHandler = async (request, reply) => {
    const { id } = request.params;
    const updateImageBody = zod_1.z.object({
        imageUrl: zod_1.z.string()
    });
    const { imageUrl } = updateImageBody.parse(request.body);
    try {
        const imageId = Number(id);
        const existingImage = await (0, imageModel_1.findImageById)(imageId);
        if (!existingImage) {
            return reply.status(404).send({ error: 'Imagem não encontrado' });
        }
        const updatedData = {
            imageUrl
        };
        const updatedImage = await (0, imageModel_1.updateImage)(imageId, updatedData);
        return reply.status(200).send({ updatedImage: updatedImage });
    }
    catch (error) {
        console.error('Erro ao atualizar imagem:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.updateImageHandler = updateImageHandler;
// Handler para deletar uma imagem
const deleteImageHandler = async (request, reply) => {
    const { id } = request.params;
    try {
        const imageId = Number(id);
        const existingImage = await (0, imageModel_1.findImageById)(imageId);
        if (!existingImage) {
            return reply.status(404).send({ error: 'Imagem não encontrada' });
        }
        await (0, imageModel_1.deleteImage)(imageId);
        return reply.status(200).send({ message: 'Imagem deletado com sucesso' });
    }
    catch (error) {
        console.error('Erro ao deletar imagem:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.deleteImageHandler = deleteImageHandler;
