"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const outputDetail_controller_1 = require("../controllers/outputDetail.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.Router();
router.route('/')
    .get(auth_middleware_1.verifyToken, outputDetail_controller_1.getOutputDetails)
    .post(auth_middleware_1.verifyToken, outputDetail_controller_1.newOutputDetail);
router.route('/:outputDetailId')
    .get(auth_middleware_1.verifyToken, outputDetail_controller_1.getOutputDetail)
    .put(auth_middleware_1.verifyToken, outputDetail_controller_1.updateOutputDetail)
    .delete(auth_middleware_1.verifyToken, outputDetail_controller_1.deleteOutputDetail);
router.route('/array')
    .post(auth_middleware_1.verifyToken, outputDetail_controller_1.newOutputDetails);
exports.default = router;
