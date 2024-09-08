"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginHandler = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const zod_1 = require("zod");
const loginHandler = async (request, reply) => {
    const loginBody = zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string(),
    });
    const { email, password } = loginBody.parse(request.body);
    try {
        const user = await (0, userModel_1.findUserByEmail)(email);
        if (!user) {
            return reply.status(401).send({ error: 'Email ou senha estão incorretos' });
        }
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return reply.status(401).send({ error: 'Email ou senha estão incorretos' });
        }
        const secretKey = process.env.SECRET_KEY_JWT;
        const token = jsonwebtoken_1.default.sign({ userId: user.id, type: user.type }, secretKey, { expiresIn: '1h' });
        // Removendo a senha do objeto user antes de enviar na resposta
        const { password: _, ...userWithoutPassword } = user;
        return reply.status(200).send({
            message: 'Login bem-sucedido!',
            token,
            user: userWithoutPassword,
        });
    }
    catch (error) {
        console.error('Erro no login:', error);
        return reply.status(500).send({ error: 'Erro interno do servidor' });
    }
};
exports.loginHandler = loginHandler;
