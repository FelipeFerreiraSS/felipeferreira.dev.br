"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticRoutes = void 0;
const authenticateJWT_1 = require("../middlewares/authenticateJWT");
const analyticController_1 = require("../controllers/analyticController");
const analyticRoutes = async (app) => {
    app.get('/analytics', { preHandler: [authenticateJWT_1.authenticateJWT] }, analyticController_1.getAnalyticsHandler);
};
exports.analyticRoutes = analyticRoutes;
