"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostHandler = exports.updatePostHandler = exports.getPostsByTagHandler = exports.getPublishedPostHandler = exports.getUserPostHandler = exports.getPostHandler = exports.getAllPostsHandler = exports.createPostHandler = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const postModel_1 = require("../models/postModel");
const imageModel_1 = require("../models/imageModel");
const tagModel_1 = require("../models/tagModel");
const prisma = new client_1.PrismaClient();
// Handler para criar um post
const createPostHandler = async (request, reply) => {
    const createPostBody = zod_1.z.object({
        title: zod_1.z.string(),
        slug: zod_1.z.string().min(1).max(255),
        published: zod_1.z.boolean().optional(),
        headerImageId: zod_1.z.number().optional(),
        summary: zod_1.z.string(),
        content: zod_1.z.string(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
    });
    const { title, slug, published = false, headerImageId, summary, content, tags } = createPostBody.parse(request.body);
    const existingPost = await (0, postModel_1.findPostBySlug)(slug);
    if (existingPost) {
        return reply.status(409).send({ error: 'Um post com esse slug já existe.' });
    }
    const user = request.user;
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
    }
    catch (error) {
        console.error('Erro ao criar post:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.createPostHandler = createPostHandler;
// Handler para obter todos os posts
const getAllPostsHandler = async (request, reply) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true,
                headerImage: true,
                tags: true,
            },
        });
        return reply.status(200).send(posts);
    }
    catch (error) {
        console.error('Erro ao obter posts:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.getAllPostsHandler = getAllPostsHandler;
// Handler para obter apenas um posts
const getPostHandler = async (request, reply) => {
    const { id } = request.params;
    try {
        const postId = Number(id);
        const existingPost = await (0, postModel_1.findPostById)(postId);
        if (!existingPost) {
            return reply.status(404).send({ error: 'Post não encontrado' });
        }
        const post = await prisma.post.findMany({
            where: { id: postId },
            include: {
                headerImage: true,
                tags: true,
            },
        });
        return reply.status(200).send({ post: post });
    }
    catch (error) {
        console.error('Erro ao obter posts:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.getPostHandler = getPostHandler;
// Handler para obter apenas os posts do usuario logado
const getUserPostHandler = async (request, reply) => {
    try {
        const user = request.user;
        const posts = await prisma.post.findMany({
            where: { authorId: user.userId },
            include: {
                headerImage: true,
                tags: true,
            },
        });
        return reply.status(200).send({ userPosts: posts });
    }
    catch (error) {
        console.error('Erro ao obter posts:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.getUserPostHandler = getUserPostHandler;
// Handler para obter apenas os posts publicados
const getPublishedPostHandler = async (request, reply) => {
    try {
        const posts = await prisma.post.findMany({
            where: { published: true },
            include: {
                headerImage: true,
                tags: true,
            },
        });
        return reply.status(200).send({ publishedPosts: posts });
    }
    catch (error) {
        console.error('Erro ao obter posts:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.getPublishedPostHandler = getPublishedPostHandler;
// Handler para obter todos os posts de uma tag
const getPostsByTagHandler = async (request, reply) => {
    const { id } = request.params;
    try {
        const tagId = Number(id);
        const existingTag = await (0, tagModel_1.findTagById)(tagId);
        if (!existingTag) {
            return reply.status(404).send({ error: 'Tag não encontrada' });
        }
        const posts = await prisma.post.findMany({
            where: { tags: { some: { id: tagId } } },
            include: {
                headerImage: true,
                tags: true,
            },
        });
        if (posts.length === 0) {
            return reply.status(404).send({ error: 'Não existe nem um post vinculado a essa tag' });
        }
        const tagDetails = await prisma.tag.findUnique({
            where: { id: tagId },
        });
        return reply.status(200).send({ tagDetails: tagDetails, postsByTag: posts });
    }
    catch (error) {
        console.error('Erro ao obter posts:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.getPostsByTagHandler = getPostsByTagHandler;
// Handler para atualizar um post
const updatePostHandler = async (request, reply) => {
    const { id } = request.params;
    const updatePostBody = zod_1.z.object({
        title: zod_1.z.string(),
        slug: zod_1.z.string().min(1).max(255),
        published: zod_1.z.boolean().optional(),
        headerImageId: zod_1.z.number().optional(),
        summary: zod_1.z.string(),
        content: zod_1.z.string(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
    });
    const { title, slug, published = false, headerImageId, summary, content, tags } = updatePostBody.parse(request.body);
    try {
        const postId = Number(id);
        const existingPost = await (0, postModel_1.findPostById)(postId);
        if (!existingPost) {
            return reply.status(404).send({ error: 'Post não encontrado' });
        }
        if (slug && slug !== existingPost.slug) {
            const userWithSlug = await (0, postModel_1.findPostBySlug)(slug);
            if (userWithSlug) {
                return reply.status(409).send({ error: 'Outro post já existe com este slug' });
            }
        }
        const imageId = Number(headerImageId);
        const existingImage = await (0, imageModel_1.findImageById)(imageId);
        if (!existingImage) {
            return reply.status(404).send({ error: 'Imagem não encontrada' });
        }
        const updatedData = {
            title,
            slug,
            published,
            headerImageId,
            summary,
            content,
        };
        await (0, postModel_1.updatePost)(postId, updatedData);
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
    }
    catch (error) {
        console.error('Erro ao atualizar post:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.updatePostHandler = updatePostHandler;
// Handler para deletar um post
const deletePostHandler = async (request, reply) => {
    const { id } = request.params;
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
        await (0, postModel_1.deletePost)(postId);
        return reply.status(200).send({ message: 'Post deletado com sucesso' });
    }
    catch (error) {
        console.error('Erro ao deletar post:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.deletePostHandler = deletePostHandler;
