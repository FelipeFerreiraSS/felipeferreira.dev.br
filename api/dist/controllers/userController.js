"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserHandler = exports.updateUserHandler = exports.getUserInfoHandler = exports.getUserHandler = exports.getAllUsersHandler = exports.createUserHandler = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const prisma = new client_1.PrismaClient();
const saltRounds = 10;
// Handler para criar um novo usuário
const createUserHandler = async (request, reply) => {
    const createUserBody = zod_1.z.object({
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string(),
        email: zod_1.z.string().email(),
        profileImageUrl: zod_1.z.string().optional(),
        type: zod_1.z.string(),
        password: zod_1.z.string(),
    });
    const { firstName, lastName, email, profileImageUrl, type, password } = createUserBody.parse(request.body);
    try {
        const existingUser = await (0, userModel_1.findUserByEmail)(email);
        if (existingUser) {
            return reply.status(409).send({ error: 'Usuário já existe com este email' });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        const user = await (0, userModel_1.createUser)({
            firstName,
            lastName,
            email,
            profileImageUrl,
            type,
            password: hashedPassword,
        });
        // Removendo a senha do objeto user antes de enviar na resposta
        const { password: _, ...userWithoutPassword } = user;
        return reply.status(201).send({ newUser: userWithoutPassword });
    }
    catch (error) {
        console.error('Erro ao criar usuário:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.createUserHandler = createUserHandler;
// Handler para obter todos os usuários
const getAllUsersHandler = async (request, reply) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                id: 'asc'
            },
            include: {
                posts: true
            }
        });
        // Removendo as senhas antes de enviar na resposta
        const usersWithoutPasswords = users.map(({ password, ...user }) => user);
        return reply.status(200).send({ allUsers: usersWithoutPasswords });
    }
    catch (error) {
        console.error('Erro ao obter usuários:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.getAllUsersHandler = getAllUsersHandler;
// Handler para obter apenas um usuários
const getUserHandler = async (request, reply) => {
    const { id } = request.params;
    try {
        const userId = Number(id);
        const existingUser = await (0, userModel_1.findUserById)(userId);
        if (!existingUser) {
            return reply.status(409).send({ error: 'Usuário não encontrado' });
        }
        const users = await prisma.user.findMany({
            where: { id: userId }
        });
        // Removendo as senhas antes de enviar na resposta
        const usersWithoutPasswords = users.map(({ password, ...user }) => user);
        return reply.status(200).send({ user: usersWithoutPasswords });
    }
    catch (error) {
        console.error('Erro ao obter usuários:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.getUserHandler = getUserHandler;
// Handler para a rota que retorna informações do usuário com base no token
const getUserInfoHandler = async (request, reply) => {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return reply.status(401).send({ error: 'Token não fornecido ou formato inválido' });
    }
    const token = authHeader.substring(7); // Remove o "Bearer " do início
    try {
        const secretKey = process.env.SECRET_KEY_JWT;
        const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
        const user = await (0, userModel_1.findUserById)(decodedToken.userId);
        if (!user) {
            return reply.status(404).send({ error: 'Usuário não encontrado' });
        }
        // Removendo a senha do objeto user antes de enviar na resposta
        const { password: _, ...userWithoutPassword } = user;
        return reply.status(200).send({ user: userWithoutPassword });
    }
    catch (error) {
        console.error('Erro ao obter informações do usuário:', error);
        return reply.status(401).send({ error: 'Token inválido ou expirado' });
    }
};
exports.getUserInfoHandler = getUserInfoHandler;
// Handler para atualizar um usuário
const updateUserHandler = async (request, reply) => {
    const { id } = request.params;
    const updateUserBody = zod_1.z.object({
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        profileImageUrl: zod_1.z.string().optional(),
        type: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
    });
    const { firstName, lastName, email, profileImageUrl, type, password } = updateUserBody.parse(request.body);
    try {
        const userId = Number(id);
        const existingUser = await (0, userModel_1.findUserById)(userId);
        if (!existingUser) {
            return reply.status(404).send({ error: 'Usuário não encontrado' });
        }
        // Se o email está sendo atualizado, verificar se já existe outro usuário com o mesmo email
        if (email && email !== existingUser.email) {
            const userWithEmail = await (0, userModel_1.findUserByEmail)(email);
            if (userWithEmail) {
                return reply.status(409).send({ error: 'Outro usuário já existe com este email' });
            }
        }
        const updatedData = {
            firstName,
            lastName,
            email,
            profileImageUrl,
            type,
        };
        if (password) {
            updatedData.password = await bcrypt_1.default.hash(password, saltRounds);
        }
        const updatedUser = await (0, userModel_1.updateUser)(userId, updatedData);
        // Removendo a senha do objeto user antes de enviar na resposta
        const { password: _, ...userWithoutPassword } = updatedUser;
        return reply.status(200).send({ updatedUser: userWithoutPassword });
    }
    catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.updateUserHandler = updateUserHandler;
// Handler para deletar um usuário
const deleteUserHandler = async (request, reply) => {
    const { id } = request.params;
    try {
        const userId = Number(id);
        const existingUser = await (0, userModel_1.findUserById)(userId);
        if (!existingUser) {
            return reply.status(404).send({ error: 'Usuário não encontrado' });
        }
        await (0, userModel_1.deleteUser)(userId);
        return reply.status(200).send({ message: 'Usuário deletado com sucesso' });
    }
    catch (error) {
        console.error('Erro ao deletar usuário:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.deleteUserHandler = deleteUserHandler;
