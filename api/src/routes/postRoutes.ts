import { FastifyInstance } from 'fastify';
import { createPostHandler, deletePostHandler, getAllPostsHandler, getPostByIdHandler, getPostBySlugHandler, getPostsByTagHandler, getPublishedPostHandler, getLatestPublishedPostHandler, getUserPostHandler, updatePostHandler } from '../controllers/postController';
import { authenticateJWT } from '../middlewares/authenticateJWT';

export const postRoutes = async (app: FastifyInstance) => {
  app.post('/posts', { preHandler: authenticateJWT }, createPostHandler);
  app.get('/posts',  { preHandler: authenticateJWT }, getAllPostsHandler)
  app.get('/posts/user', { preHandler: authenticateJWT }, getUserPostHandler)
  app.get('/posts/published', getPublishedPostHandler)
  app.get('/posts/published/latest', getLatestPublishedPostHandler)
  app.get('/posts/id/:id', { preHandler: authenticateJWT }, getPostByIdHandler)
  app.get('/posts/slug/:slug', getPostBySlugHandler)
  app.get('/posts/tag/:name', getPostsByTagHandler)
  app.delete('/posts/:id',{ preHandler: authenticateJWT }, deletePostHandler)
  app.patch('/posts/:id',{ preHandler: authenticateJWT }, updatePostHandler)
};
