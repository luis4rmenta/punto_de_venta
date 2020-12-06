"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const input_controller_1 = require("../controllers/input.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const isModerator_middleware_1 = require("../middlewares/isModerator.middleware");
router.route('/')
    .get(input_controller_1.getInputs)
    .post(auth_middleware_1.verifyToken, input_controller_1.newInput);
router.route('/:inputId')
    .put([auth_middleware_1.verifyToken, isModerator_middleware_1.isModerator], input_controller_1.updateInput)
    .get(auth_middleware_1.verifyToken, input_controller_1.getInput)
    .delete([auth_middleware_1.verifyToken, isModerator_middleware_1.isModerator], input_controller_1.deleteInput);
exports.default = router;
