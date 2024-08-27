import { FastifyInstance } from 'fastify';
import { createPostHandler, deletePostHandler, getAllPostsHandler } from '../controllers/postController';
import { authenticateJWT } from '../middlewares/authenticateJWT';

export const postRoutes = async (app: FastifyInstance) => {
  // Rota protegida por autenticação JWT
  app.post('/posts', { preHandler: authenticateJWT }, createPostHandler);
  app.get('/posts',  getAllPostsHandler)
  app.delete('/posts/:id',{ preHandler: authenticateJWT }, deletePostHandler)
};
