"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const product_controller_1 = require("../controllers/product.controller");
router.route('/')
    .get(product_controller_1.getProducts)
    .post(product_controller_1.newProduct);
router.route('/:productId')
    .get(product_controller_1.getProduct)
    .put(product_controller_1.updateProduct)
    .delete(product_controller_1.deleteProduct);
router.route('/codebar/:codebar')
    .get(product_controller_1.findProductByCodebar);
exports.default = router;
