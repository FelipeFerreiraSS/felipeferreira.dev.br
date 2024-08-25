"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const authController_1 = require("../controllers/authController");
const authRoutes = async (app) => {
    app.post('/login', authController_1.loginHandler);
};
exports.authRoutes = authRoutes;
