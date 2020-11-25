"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
router.route('/')
    .get(auth_middleware_1.verifyToken, product_controller_1.getProducts)
    .post(auth_middleware_1.verifyToken, product_controller_1.newProduct);
router.route('/:productId')
    .get(auth_middleware_1.verifyToken, product_controller_1.getProduct)
    .put(auth_middleware_1.verifyToken, product_controller_1.updateProduct)
    .delete(auth_middleware_1.verifyToken, product_controller_1.deleteProduct);
router.route('/codebar/:codebar')
    .get(auth_middleware_1.verifyToken, product_controller_1.findProductByCodebar);
exports.default = router;
