import { FastifyRequest, FastifyReply } from 'fastify';

export const authorizeType = (allowedRoles: string[]) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user as { userId: number; type: string };

    if (!user || !allowedRoles.includes(user.type)) {
      return reply.status(403).send({ error: 'Você não tem permissão para acessar essa área do sistema.' });
    }
  };
};