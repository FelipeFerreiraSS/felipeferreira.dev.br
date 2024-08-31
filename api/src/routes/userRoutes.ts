import { FastifyInstance } from 'fastify';
import {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  updateUserHandler,
} from '../controllers/userController';
import { authenticateJWT } from '../middlewares/authenticateJWT';

export const userRoutes = async (app: FastifyInstance) => {
  // Rotas protegidas por autenticação JWT
  app.post('/users', { preHandler: authenticateJWT }, createUserHandler);
  app.get('/users', { preHandler: authenticateJWT }, getAllUsersHandler);
  app.put('/users/:id', { preHandler: authenticateJWT }, updateUserHandler);
  app.delete('/users/:id', { preHandler: authenticateJWT }, deleteUserHandler);
};
