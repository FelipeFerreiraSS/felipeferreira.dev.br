import { FastifyInstance } from 'fastify';
import { authenticateJWT } from '../middlewares/authenticateJWT';
import { getAnalyticsHandler } from '../controllers/analyticController';

export const analyticRoutes = async (app: FastifyInstance) => {
  app.get('/analytics', { preHandler: [authenticateJWT] }, getAnalyticsHandler);
};
