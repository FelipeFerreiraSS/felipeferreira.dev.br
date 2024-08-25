import { FastifyInstance } from 'fastify';
import { loginHandler } from '../controllers/authController';

export const authRoutes = async (app: FastifyInstance) => {
  //app.post('/login', loginHandler);
};