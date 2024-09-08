"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const userController_1 = require("../controllers/userController");
const authenticateJWT_1 = require("../middlewares/authenticateJWT");
const authorizeType_1 = require("../middlewares/authorizeType");
const userRoutes = async (app) => {
    // Rotas protegidas por autenticação JWT
    app.post('/users', { preHandler: [authenticateJWT_1.authenticateJWT, (0, authorizeType_1.authorizeType)(['admin'])] }, userController_1.createUserHandler);
    app.get('/users', { preHandler: [authenticateJWT_1.authenticateJWT, (0, authorizeType_1.authorizeType)(['admin'])] }, userController_1.getAllUsersHandler);
    app.get('/user-info', { preHandler: authenticateJWT_1.authenticateJWT }, userController_1.getUserInfoHandler);
    app.get('/users/:id', { preHandler: [authenticateJWT_1.authenticateJWT, (0, authorizeType_1.authorizeType)(['admin'])] }, userController_1.getUserHandler);
    app.put('/users/:id', { preHandler: authenticateJWT_1.authenticateJWT }, userController_1.updateUserHandler);
    app.delete('/users/:id', { preHandler: authenticateJWT_1.authenticateJWT }, userController_1.deleteUserHandler);
};
exports.userRoutes = userRoutes;
