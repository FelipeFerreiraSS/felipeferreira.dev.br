import { FastifyInstance } from 'fastify';
import {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getUserHandler,
  getUserInfoHandler,
  updateUserHandler,
} from '../controllers/userController';
import { authenticateJWT } from '../middlewares/authenticateJWT';
import { authorizeType } from '../middlewares/authorizeType';

export const userRoutes = async (app: FastifyInstance) => {
  // Rotas protegidas por autenticação JWT
  app.post('/users', { preHandler: [authenticateJWT, authorizeType(['admin'])] }, createUserHandler);
  app.get('/users', { preHandler: [authenticateJWT, authorizeType(['admin'])] }, getAllUsersHandler);
  app.get('/user-info', { preHandler: authenticateJWT }, getUserInfoHandler);
  app.get('/users/:id', { preHandler: [authenticateJWT, authorizeType(['admin'])] }, getUserHandler);
  app.put('/users/:id', { preHandler: authenticateJWT }, updateUserHandler);
  app.delete('/users/:id', { preHandler: authenticateJWT }, deleteUserHandler);
};
