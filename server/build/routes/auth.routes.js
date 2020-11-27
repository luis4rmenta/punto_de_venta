"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.Router();
router.route('/register')
    .post(auth_controller_1.register);
router.route('/login')
    .post(auth_controller_1.login);
router.route('/userType')
    .get([auth_middleware_1.verifyToken], auth_controller_1.getUserType);
exports.default = router;
