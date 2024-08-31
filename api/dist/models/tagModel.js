"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTag = exports.updateTag = exports.createTag = exports.findTagByName = exports.findTagById = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const findTagById = async (id) => {
    return prisma.tag.findUnique({
        where: { id },
    });
};
exports.findTagById = findTagById;
const findTagByName = async (name) => {
    return prisma.tag.findUnique({
        where: { name },
    });
};
exports.findTagByName = findTagByName;
const createTag = async (data) => {
    return prisma.tag.create({
        data
    });
};
exports.createTag = createTag;
const updateTag = async (id, data) => {
    return prisma.tag.update({
        where: { id },
        data,
    });
};
exports.updateTag = updateTag;
const deleteTag = async (id) => {
    return prisma.tag.delete({
        where: { id }
    });
};
exports.deleteTag = deleteTag;
