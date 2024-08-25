"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const userController_1 = require("../controllers/userController");
const authenticateJWT_1 = require("../middlewares/authenticateJWT");
const userRoutes = async (app) => {
    // Rotas protegidas por autenticação JWT
    //app.post('/users', { preHandler: authenticateJWT }, createUserHandler);
    app.post('/users', userController_1.createUserHandler);
    app.get('/users', { preHandler: authenticateJWT_1.authenticateJWT }, userController_1.getAllUsersHandler);
    app.put('/users/:id', { preHandler: authenticateJWT_1.authenticateJWT }, userController_1.updateUserHandler);
    app.delete('/users/:id', { preHandler: authenticateJWT_1.authenticateJWT }, userController_1.deleteUserHandler);
};
exports.userRoutes = userRoutes;
