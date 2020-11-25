"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const input_controller_1 = require("../controllers/input.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
router.route('/')
    .post(auth_middleware_1.verifyToken, input_controller_1.addInput)
    .put(auth_middleware_1.verifyToken, input_controller_1.updateInput);
router.route('/:inputId')
    .get(auth_middleware_1.verifyToken, input_controller_1.getInputById)
    .delete(auth_middleware_1.verifyToken, input_controller_1.deleteInput);
exports.default = router;
