"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const postController_1 = require("../controllers/postController");
const authenticateJWT_1 = require("../middlewares/authenticateJWT");
const postRoutes = async (app) => {
    app.post('/posts', { preHandler: authenticateJWT_1.authenticateJWT }, postController_1.createPostHandler);
    app.get('/posts', { preHandler: authenticateJWT_1.authenticateJWT }, postController_1.getAllPostsHandler);
    app.get('/posts/user', { preHandler: authenticateJWT_1.authenticateJWT }, postController_1.getUserPostHandler);
    app.get('/posts/published', postController_1.getPublishedPostHandler);
    app.get('/posts/:id', { preHandler: authenticateJWT_1.authenticateJWT }, postController_1.getPostHandler);
    app.get('/posts/tag/:id', postController_1.getPostsByTagHandler);
    app.delete('/posts/:id', { preHandler: authenticateJWT_1.authenticateJWT }, postController_1.deletePostHandler);
    app.patch('/posts/:id', { preHandler: authenticateJWT_1.authenticateJWT }, postController_1.updatePostHandler);
};
exports.postRoutes = postRoutes;
