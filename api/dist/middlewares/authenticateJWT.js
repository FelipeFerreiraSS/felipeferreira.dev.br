"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware para verificar o token JWT
const authenticateJWT = async (request, reply) => {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
        return reply.status(401).send({ error: 'Token de autorização ausente' });
    }
    const token = authHeader.split(' ')[1];
    const secretKey = process.env.SECRET_KEY_JWT;
    if (!token) {
        return reply.status(401).send({ error: 'Token ausente' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        request.user = decoded;
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return reply.status(401).send({ error: 'Token expirado' });
        }
        else if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return reply.status(401).send({ error: 'Token inválido' });
        }
        else {
            return reply.status(403).send({ error: 'Falha na verificação do token' });
        }
    }
};
exports.authenticateJWT = authenticateJWT;
