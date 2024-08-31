"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImage = exports.updateImage = exports.findImageById = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const findImageById = async (id) => {
    return prisma.image.findUnique({
        where: { id },
    });
};
exports.findImageById = findImageById;
const updateImage = async (id, data) => {
    return prisma.image.update({
        where: { id },
        data,
    });
};
exports.updateImage = updateImage;
const deleteImage = async (id) => {
    return prisma.image.delete({
        where: { id },
    });
};
exports.deleteImage = deleteImage;
