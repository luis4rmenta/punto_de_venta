"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const output_controller_1 = require("../controllers/output.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const isModerator_middleware_1 = require("../middlewares/isModerator.middleware");
const router = express_1.Router();
router.route('/')
    .get([auth_middleware_1.verifyToken, isModerator_middleware_1.isModerator], output_controller_1.getOutputs)
    .post(auth_middleware_1.verifyToken, output_controller_1.newOutput);
router.route('/:outputId')
    .get(auth_middleware_1.verifyToken, output_controller_1.getOutput)
    .post([auth_middleware_1.verifyToken, isModerator_middleware_1.isModerator], output_controller_1.updateOutput)
    .delete([auth_middleware_1.verifyToken, isModerator_middleware_1.isModerator], output_controller_1.deleteOutPut);
exports.default = router;
