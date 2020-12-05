"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const provider_controller_1 = require("../controllers/provider.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const isAdmin_middleware_1 = require("../middlewares/isAdmin.middleware");
const isModerator_middleware_1 = require("../middlewares/isModerator.middleware");
router.route('/')
    .get([auth_middleware_1.verifyToken, isModerator_middleware_1.isModerator], provider_controller_1.getProviders)
    .post([auth_middleware_1.verifyToken, isAdmin_middleware_1.isAdmin], provider_controller_1.newProvider);
router.route('/:providerId')
    .get(auth_middleware_1.verifyToken, provider_controller_1.getProvider)
    .put([auth_middleware_1.verifyToken, isAdmin_middleware_1.isAdmin], provider_controller_1.updateProvider)
    .delete([auth_middleware_1.verifyToken, isAdmin_middleware_1.isAdmin], provider_controller_1.deleteProvider);
exports.default = router;
