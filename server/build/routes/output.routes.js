"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const output_controller_1 = require("../controllers/output.controller");
const router = express_1.Router();
router.route('/')
    .get(output_controller_1.getOutputs)
    .post(output_controller_1.newOutput);
router.route('/:outputId')
    .get(output_controller_1.getOutput)
    .post(output_controller_1.updateOutput)
    .delete(output_controller_1.deleteOutPut);
exports.default = router;
