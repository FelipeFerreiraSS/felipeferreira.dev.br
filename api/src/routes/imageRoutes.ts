import { FastifyInstance } from 'fastify';
import { createImageHandler } from '../controllers/imageController';
import { authenticateJWT } from '../middlewares/authenticateJWT';

export const imageRoutes = async (app: FastifyInstance) => {
  // Rota protegida por autenticação JWT
  app.post('/images', { preHandler: authenticateJWT }, createImageHandler);
};