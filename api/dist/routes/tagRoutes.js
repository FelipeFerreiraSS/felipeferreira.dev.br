"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagRoutes = void 0;
const authenticateJWT_1 = require("../middlewares/authenticateJWT");
const tagController_1 = require("../controllers/tagController");
const tagRoutes = async (app) => {
    // Rota protegida por autenticação JWT
    app.post('/tag', { preHandler: authenticateJWT_1.authenticateJWT }, tagController_1.createTagHandler);
    app.get('/tag', { preHandler: authenticateJWT_1.authenticateJWT }, tagController_1.getAllTagsHandler);
    app.get('/tag/:id', { preHandler: authenticateJWT_1.authenticateJWT }, tagController_1.getTagHandler);
    app.put('/tag/:id', { preHandler: authenticateJWT_1.authenticateJWT }, tagController_1.updateTagHandler);
    app.delete('/tag/:id', { preHandler: authenticateJWT_1.authenticateJWT }, tagController_1.deleteTagHandler);
};
exports.tagRoutes = tagRoutes;
