"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.findUserById = exports.findUserByEmail = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const findUserByEmail = async (email) => {
    return prisma.user.findUnique({
        where: { email },
    });
};
exports.findUserByEmail = findUserByEmail;
const findUserById = async (id) => {
    return prisma.user.findUnique({
        where: { id },
    });
};
exports.findUserById = findUserById;
const createUser = async (data) => {
    return prisma.user.create({
        data,
    });
};
exports.createUser = createUser;
const updateUser = async (id, data) => {
    return prisma.user.update({
        where: { id },
        data,
    });
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    return prisma.user.delete({
        where: { id },
    });
};
exports.deleteUser = deleteUser;
