"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const provider_controller_1 = require("../controllers/provider.controller");
router.route('/')
    .get(provider_controller_1.getProviders)
    .post(provider_controller_1.newProvider)
    .put(provider_controller_1.updateProvider);
router.route('/:providerId')
    .get(provider_controller_1.getProvider)
    .delete(provider_controller_1.deleteProvider);
exports.default = router;
