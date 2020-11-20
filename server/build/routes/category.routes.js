"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const router = express_1.Router();
router.route('/')
    .get(category_controller_1.getCategories)
    .post(category_controller_1.newCategory)
    .put(category_controller_1.updateCategory);
router.route('/:categoryId')
    .get(category_controller_1.getCategory)
    .delete(category_controller_1.deleteCategory);
exports.default = router;
