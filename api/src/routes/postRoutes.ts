import { FastifyInstance } from 'fastify';
import { createPostHandler } from '../controllers/postController';
import { authenticateJWT } from '../middlewares/authenticateJWT';

export const postRoutes = async (app: FastifyInstance) => {
  // Rota protegida por autenticação JWT
  app.post('/posts', { preHandler: authenticateJWT }, createPostHandler);
};
