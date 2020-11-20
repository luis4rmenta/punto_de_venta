"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const input_controller_1 = require("../controllers/input.controller");
router.route('/')
    .post(input_controller_1.addInput)
    .put(input_controller_1.updateInput);
router.route('/:inputId')
    .get(input_controller_1.getInputById)
    .delete(input_controller_1.deleteInput);
exports.default = router;
