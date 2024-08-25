import { FastifyRequest, FastifyReply } from 'fastify';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Middleware para verificar o token JWT
export const authenticateJWT = async (request: FastifyRequest, reply: FastifyReply) => {
  const authHeader = request.headers['authorization'];

  if (!authHeader) {
    return reply.status(401).send({ error: 'Token de autorização ausente' });
  }

  const token = authHeader.split(' ')[1];
  const secretKey = process.env.SECRET_KEY_JWT as string;

  if (!token) {
    return reply.status(401).send({ error: 'Token ausente' });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    request.user = decoded;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return reply.status(401).send({ error: 'Token expirado' });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return reply.status(401).send({ error: 'Token inválido' });
    } else {
      return reply.status(403).send({ error: 'Falha na verificação do token' });
    }
  }
};
