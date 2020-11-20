"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const input_controller_1 = require("../controllers/input.controller");
router.route('/')
    .get(input_controller_1.hello)
    .post(input_controller_1.addInput);
router.route('/asd')
    .get((req, res) => {
    console.log('asd');
});
exports.default = router;
