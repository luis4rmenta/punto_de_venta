"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.Router();
router.route('/')
    .get(auth_middleware_1.verifyToken, category_controller_1.getCategories)
    .post(auth_middleware_1.verifyToken, category_controller_1.newCategory)
    .put(auth_middleware_1.verifyToken, category_controller_1.updateCategory);
router.route('/:categoryId')
    .get(auth_middleware_1.verifyToken, category_controller_1.getCategory)
    .delete(auth_middleware_1.verifyToken, category_controller_1.deleteCategory);
exports.default = router;
