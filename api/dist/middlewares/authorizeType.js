"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeType = void 0;
const authorizeType = (allowedRoles) => {
    return async (request, reply) => {
        const user = request.user;
        if (!user || !allowedRoles.includes(user.type)) {
            return reply.status(403).send({ error: 'Você não tem permissão para acessar essa área do sistema.' });
        }
    };
};
exports.authorizeType = authorizeType;
