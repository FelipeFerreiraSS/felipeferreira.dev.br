import { FastifyInstance } from 'fastify';
import {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  updateUserHandler,
} from '../controllers/userController';
import { authenticateJWT } from '../middlewares/authenticateJWT';
import { authorizeType } from '../middlewares/authorizeType';

export const userRoutes = async (app: FastifyInstance) => {
  // Rotas protegidas por autenticação JWT
  app.post('/users', { preHandler: [authenticateJWT, authorizeType(['administrador'])] }, createUserHandler);
  app.get('/users', { preHandler: [authenticateJWT, authorizeType(['administrador'])] }, getAllUsersHandler);
  app.put('/users/:id', { preHandler: authenticateJWT }, updateUserHandler);
  app.delete('/users/:id', { preHandler: authenticateJWT }, deleteUserHandler);
};
