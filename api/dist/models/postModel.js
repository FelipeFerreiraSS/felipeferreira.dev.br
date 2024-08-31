"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.findPostBySlug = exports.findPostById = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const findPostById = async (id) => {
    return prisma.post.findUnique({
        where: { id },
    });
};
exports.findPostById = findPostById;
const findPostBySlug = async (slug) => {
    return prisma.post.findUnique({
        where: { slug },
    });
};
exports.findPostBySlug = findPostBySlug;
const updatePost = async (id, data) => {
    return prisma.post.update({
        where: { id },
        data,
    });
};
exports.updatePost = updatePost;
const deletePost = async (id) => {
    return prisma.post.delete({
        where: { id },
    });
};
exports.deletePost = deletePost;
