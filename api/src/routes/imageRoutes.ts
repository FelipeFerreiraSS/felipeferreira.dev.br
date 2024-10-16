import { FastifyInstance } from 'fastify';
import { createImageHandler, deleteImageHandler, getAllImagesHandler, getAllUserImagesHandler, getImageHandler, updateImageHandler } from '../controllers/imageController';
import { authenticateJWT } from '../middlewares/authenticateJWT';

export const imageRoutes = async (app: FastifyInstance) => {
  // Rota protegida por autenticação JWT
  app.get('/images', { preHandler: authenticateJWT }, getAllImagesHandler);
  app.get('/images/user', { preHandler: authenticateJWT }, getAllUserImagesHandler);
  app.get('/images/:id', { preHandler: authenticateJWT }, getImageHandler);
  app.post('/images', { preHandler: authenticateJWT }, createImageHandler);
  app.put('/images/:id', { preHandler: authenticateJWT }, updateImageHandler);
  app.delete('/images/:id', { preHandler: authenticateJWT }, deleteImageHandler);
};