"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsByMonthByUser = exports.getPostsPerTagByUser = exports.getAverageReadTimeByUser = exports.getMostRecentPostByUser = exports.getImagesByUser = exports.getPostsDraftByUser = exports.getPostsPublishedByUser = exports.getPostsByMonth = exports.getPostsPerTag = exports.getAverageReadTime = exports.getMostRecentPost = exports.getImages = exports.getTopAuthor = exports.getTags = exports.getPostsDraft = exports.getPostsPublished = exports.getAnalyticsHandler = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Handler para exibir estatísticas do crm
const getAnalyticsHandler = async (request, reply) => {
    try {
        const user = request.user;
        let response = {};
        if (user.type === 'admin') {
            const postsPublished = await (0, exports.getPostsPublished)();
            const postsDraft = await (0, exports.getPostsDraft)();
            const tags = await (0, exports.getTags)();
            const topAuthor = await (0, exports.getTopAuthor)();
            const images = await (0, exports.getImages)();
            const mostRecentPost = await (0, exports.getMostRecentPost)();
            const averageReadTime = await (0, exports.getAverageReadTime)();
            const postsPerTag = await (0, exports.getPostsPerTag)();
            const postsByMonth = await (0, exports.getPostsByMonth)();
            response = {
                message: 'Admin analytics',
                postsPublished,
                postsDraft,
                tags,
                topAuthor,
                images,
                mostRecentPost,
                averageReadTime,
                postsPerTag: postsPerTag.map(tag => ({
                    idTag: tag.id,
                    tagName: tag.name,
                    totalPosts: tag._count.posts,
                })),
                postsByMonth
            };
        }
        else {
            const postsPublished = await (0, exports.getPostsPublishedByUser)(user.userId);
            const postsDraft = await (0, exports.getPostsDraftByUser)(user.userId);
            const tags = await (0, exports.getTags)();
            const images = await (0, exports.getImagesByUser)(user.userId);
            const mostRecentPost = await (0, exports.getMostRecentPostByUser)(user.userId);
            const averageReadTime = await (0, exports.getAverageReadTimeByUser)(user.userId);
            const postsPerTag = await (0, exports.getPostsPerTagByUser)(user.userId);
            const postsByMonth = await (0, exports.getPostsByMonthByUser)(user.userId);
            response = {
                message: 'Editor analytics',
                postsPublished,
                postsDraft,
                tags,
                images,
                mostRecentPost,
                averageReadTime,
                postsPerTag: postsPerTag.map(tag => ({
                    idTag: tag.id,
                    tagName: tag.name,
                    totalPosts: tag._count.posts,
                })),
                postsByMonth
            };
        }
        return reply.status(200).send({ analytics: response });
    }
    catch (error) {
        console.error('Erro ao obter Analytics:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.getAnalyticsHandler = getAnalyticsHandler;
// ####################################################### admin
// todos os posts publicados
const getPostsPublished = async () => {
    const postsPublished = await prisma.post.count({
        where: { published: true },
    });
    return postsPublished;
};
exports.getPostsPublished = getPostsPublished;
// todos os posts não publicados
const getPostsDraft = async () => {
    const postsDraft = await prisma.post.count({
        where: { published: false },
    });
    return postsDraft;
};
exports.getPostsDraft = getPostsDraft;
// quantidade de tags
const getTags = async () => {
    const tags = await prisma.tag.count({});
    return tags;
};
exports.getTags = getTags;
// autor com mais posts publicados
const getTopAuthor = async () => {
    const userWithMostPosts = await prisma.post.groupBy({
        by: ['authorId'],
        where: { published: true },
        _count: { authorId: true },
        orderBy: {
            _count: {
                authorId: 'desc',
            },
        },
        take: 1,
    });
    const topAuthor = await prisma.user.findUnique({
        where: { id: userWithMostPosts[0].authorId },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            // posts: {
            //   where: { published: true },
            //   select: { id: true, title: true },
            // },
        },
    });
    return {
        ...topAuthor,
        postsPublished: userWithMostPosts[0]._count.authorId,
    };
};
exports.getTopAuthor = getTopAuthor;
// quantidade de imagens
const getImages = async () => {
    const images = await prisma.image.count({});
    return images;
};
exports.getImages = getImages;
// post mais recente
const getMostRecentPost = async () => {
    const mostRecentPost = await prisma.post.findFirst({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            title: true,
            summary: true,
            createdAt: true,
            headerImage: {
                select: {
                    id: true,
                    imageUrl: true,
                },
            },
        },
    });
    return mostRecentPost;
};
exports.getMostRecentPost = getMostRecentPost;
// media de tempo de leitura de um post
const getAverageReadTime = async () => {
    const posts = await prisma.post.findMany({
        where: { published: true },
        select: {
            readTime: true,
        },
    });
    const totalReadTime = posts.reduce((total, post) => {
        const readTimeInMinutes = post.readTime ? parseInt(post.readTime, 10) : 0;
        return total + (isNaN(readTimeInMinutes) ? 0 : readTimeInMinutes);
    }, 0);
    const averageReadTime = totalReadTime / posts.length;
    const minutes = Math.floor(averageReadTime);
    const seconds = Math.round((averageReadTime - minutes) * 60);
    return `${minutes}:${seconds}`;
};
exports.getAverageReadTime = getAverageReadTime;
// todos os posts por tag
const getPostsPerTag = async () => {
    const postsPerTag = await prisma.tag.findMany({
        select: {
            id: true,
            name: true,
            _count: {
                select: { posts: true },
            },
        },
    });
    return postsPerTag;
};
exports.getPostsPerTag = getPostsPerTag;
// ordena os posts criados em ordem decrescente
const getPostsByMonth = async () => {
    const postsByMonth = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            title: true,
            createdAt: true,
            published: true
        },
    });
    return postsByMonth;
};
exports.getPostsByMonth = getPostsByMonth;
// ####################################################### editor
// todos os posts publicados por o usuário logado
const getPostsPublishedByUser = async (id) => {
    const postsPublishedByUser = await prisma.post.count({
        where: { published: true, authorId: id },
    });
    return postsPublishedByUser;
};
exports.getPostsPublishedByUser = getPostsPublishedByUser;
// todos os posts publicados por o usuário logado
const getPostsDraftByUser = async (id) => {
    const postsDraftByUser = await prisma.post.count({
        where: { published: false, authorId: id },
    });
    return postsDraftByUser;
};
exports.getPostsDraftByUser = getPostsDraftByUser;
// quantidade de imagens do usário logado
const getImagesByUser = async (id) => {
    const images = await prisma.image.count({
        where: { uploadedById: id }
    });
    return images;
};
exports.getImagesByUser = getImagesByUser;
// post mais recente do usário logado
const getMostRecentPostByUser = async (id) => {
    const mostRecentPost = await prisma.post.findFirst({
        where: { published: true, authorId: id },
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            title: true,
            summary: true,
            createdAt: true,
            headerImage: {
                select: {
                    id: true,
                    imageUrl: true,
                },
            },
        },
    });
    return mostRecentPost;
};
exports.getMostRecentPostByUser = getMostRecentPostByUser;
// media de tempo de leitura de um post do usário logado
const getAverageReadTimeByUser = async (id) => {
    const posts = await prisma.post.findMany({
        where: { published: true, authorId: id },
        select: {
            readTime: true,
        },
    });
    if (posts.length === 0) {
        // Se o usuário não tem posts, retorna "00:00"
        return "00:00";
    }
    const totalReadTime = posts.reduce((total, post) => {
        const readTimeInMinutes = post.readTime ? parseInt(post.readTime, 10) : 0;
        return total + (isNaN(readTimeInMinutes) ? 0 : readTimeInMinutes);
    }, 0);
    const averageReadTime = totalReadTime / posts.length;
    if (isNaN(averageReadTime)) {
        // Se a média for NaN, retorna "00:00"
        return "00:00";
    }
    const minutes = Math.floor(averageReadTime);
    const seconds = Math.round((averageReadTime - minutes) * 60);
    return `${minutes}:${seconds}`;
};
exports.getAverageReadTimeByUser = getAverageReadTimeByUser;
// todos os posts por tag do usário logado
const getPostsPerTagByUser = async (id) => {
    const postsPerTag = await prisma.tag.findMany({
        where: {
            posts: {
                some: {
                    authorId: id
                }
            }
        },
        select: {
            id: true,
            name: true,
            _count: {
                select: { posts: true },
            },
        },
    });
    return postsPerTag;
};
exports.getPostsPerTagByUser = getPostsPerTagByUser;
// ordena os posts criados em ordem decrescente do usário logado
const getPostsByMonthByUser = async (id) => {
    const postsByMonth = await prisma.post.findMany({
        where: { authorId: id },
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            title: true,
            createdAt: true,
            published: true
        },
    });
    return postsByMonth;
};
exports.getPostsByMonthByUser = getPostsByMonthByUser;
