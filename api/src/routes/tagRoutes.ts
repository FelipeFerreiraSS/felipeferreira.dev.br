import { FastifyInstance } from "fastify";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { createTagHandler, deleteTagHandler, getAllTagsHandler, getTagHandler, updateTagHandler } from "../controllers/tagController";

export const tagRoutes = async (app: FastifyInstance) => {
  // Rota protegida por autenticação JWT
  app.post('/tag', { preHandler: authenticateJWT }, createTagHandler);
  app.get('/tag', { preHandler: authenticateJWT }, getAllTagsHandler);
  app.get('/tag/:id', { preHandler: authenticateJWT }, getTagHandler);
  app.put('/tag/:id', { preHandler: authenticateJWT }, updateTagHandler);
  app.delete('/tag/:id', { preHandler: authenticateJWT }, deleteTagHandler);
};