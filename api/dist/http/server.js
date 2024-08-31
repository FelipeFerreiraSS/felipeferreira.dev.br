"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const dotenv_1 = __importDefault(require("dotenv"));
require('dotenv').config();
const authRoutes_1 = require("../routes/authRoutes");
const userRoutes_1 = require("../routes/userRoutes");
const postRoutes_1 = require("../routes/postRoutes");
const imageRoutes_1 = require("../routes/imageRoutes");
const tagRoutes_1 = require("../routes/tagRoutes");
const app = (0, fastify_1.default)();
const port = 3333;
dotenv_1.default.config();
app.get('/', async (request, reply) => {
    return reply.status(200).send({ message: 'Servidor rodando!!! 🚀🚀🚀🚀' });
});
app.register(authRoutes_1.authRoutes);
app.register(userRoutes_1.userRoutes);
app.register(postRoutes_1.postRoutes);
app.register(imageRoutes_1.imageRoutes);
app.register(tagRoutes_1.tagRoutes);
app.listen({ port }).then(() => {
    console.log(`Server rodando na porta: ${port}`);
});
