"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const outputDetail_controller_1 = require("../controllers/outputDetail.controller");
const router = express_1.Router();
router.route('/')
    .get(outputDetail_controller_1.getOutputDetails)
    .post(outputDetail_controller_1.newOutputDetail);
router.route('/:outputDetailId')
    .get(outputDetail_controller_1.getOutputDetail)
    .put(outputDetail_controller_1.updateOutputDetail)
    .delete(outputDetail_controller_1.deleteOutputDetail);
exports.default = router;
