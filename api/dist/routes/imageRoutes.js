"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRoutes = void 0;
const imageController_1 = require("../controllers/imageController");
const authenticateJWT_1 = require("../middlewares/authenticateJWT");
const imageRoutes = async (app) => {
    // Rota protegida por autenticação JWT
    app.get('/images', { preHandler: authenticateJWT_1.authenticateJWT }, imageController_1.getAllImagesHandler);
    app.get('/images/:id', { preHandler: authenticateJWT_1.authenticateJWT }, imageController_1.getImageHandler);
    app.post('/images', { preHandler: authenticateJWT_1.authenticateJWT }, imageController_1.createImageHandler);
    app.put('/images/:id', { preHandler: authenticateJWT_1.authenticateJWT }, imageController_1.updateImageHandler);
    app.delete('/images/:id', { preHandler: authenticateJWT_1.authenticateJWT }, imageController_1.deleteImageHandler);
};
exports.imageRoutes = imageRoutes;
