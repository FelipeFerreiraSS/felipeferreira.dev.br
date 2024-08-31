"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTagHandler = exports.updateTagHandler = exports.getTagHandler = exports.getAllTagsHandler = exports.createTagHandler = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const tagModel_1 = require("../models/tagModel");
const prisma = new client_1.PrismaClient();
// Handler para criar uma nova tag
const createTagHandler = async (request, reply) => {
    const createTagBody = zod_1.z.object({
        name: zod_1.z.string()
    });
    const { name } = createTagBody.parse(request.body);
    try {
        const existingTag = await (0, tagModel_1.findTagByName)(name);
        if (existingTag) {
            return reply.status(409).send({ error: 'Tag já existente' });
        }
        const tag = await (0, tagModel_1.createTag)({
            name
        });
        return reply.status(201).send({ newTag: tag });
    }
    catch (error) {
        console.error('Erro ao criar tag:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.createTagHandler = createTagHandler;
// Handler para obter todas as tags
const getAllTagsHandler = async (request, reply) => {
    try {
        const tags = await prisma.tag.findMany();
        return reply.status(200).send({ allTags: tags });
    }
    catch (error) {
        console.error('Erro ao obter tags:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.getAllTagsHandler = getAllTagsHandler;
// Handler para obter apenas uma tag
const getTagHandler = async (request, reply) => {
    const { id } = request.params;
    try {
        const tagId = Number(id);
        const existingTag = await (0, tagModel_1.findTagById)(tagId);
        if (!existingTag) {
            return reply.status(404).send({ error: 'Tag não encontrada' });
        }
        const tag = await prisma.tag.findUnique({
            where: { id: tagId },
        });
        return reply.status(200).send({ tag: tag });
    }
    catch (error) {
        console.error('Erro ao obter tags:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.getTagHandler = getTagHandler;
// Handler para atualizar uma tag
const updateTagHandler = async (request, reply) => {
    const { id } = request.params;
    const updateTagBody = zod_1.z.object({
        name: zod_1.z.string()
    });
    const { name } = updateTagBody.parse(request.body);
    try {
        const tagId = Number(id);
        const existingTag = await (0, tagModel_1.findTagById)(tagId);
        if (!existingTag) {
            return reply.status(404).send({ error: 'Tag não encontrada' });
        }
        const updatedData = {
            name
        };
        const updatedTag = await (0, tagModel_1.updateTag)(tagId, updatedData);
        return reply.status(200).send({ updatedTag: updatedTag });
    }
    catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.updateTagHandler = updateTagHandler;
// Handler para deletar uma tag
const deleteTagHandler = async (request, reply) => {
    const { id } = request.params;
    try {
        const tagId = Number(id);
        const existingTag = await (0, tagModel_1.findTagById)(tagId);
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
        await (0, tagModel_1.deleteTag)(tagId);
        return reply.status(200).send({ message: 'Tag deletado com sucesso' });
    }
    catch (error) {
        console.error('Erro ao deletar tag:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.deleteTagHandler = deleteTagHandler;
