"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.newCategory = exports.getCategory = exports.getCategories = void 0;
const database_1 = require("../database");
const mysql_controller_1 = require("./mysql.controller");
function getCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield mysql_controller_1.getTable('categoria');
        return res.json(categories);
    });
}
exports.getCategories = getCategories;
function getCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = parseInt(req.params.categoryId);
        const category = yield mysql_controller_1.getRow('categoria', 'categoria_id', categoryId);
        return res.json(category);
    });
}
exports.getCategory = getCategory;
function newCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCategory = req.body;
        const conn = yield database_1.connect();
        const resp = yield conn.query(`INSERT INTO categoria (nombre) values (?)`, [newCategory.nombre]).then((resp) => resp[0]);
        if (resp.affectedRows) {
            return res.json({
                message: 'category added',
                category_id: resp.insertId
            });
        }
        else {
            return res.json({
                message: 'error'
            });
        }
    });
}
exports.newCategory = newCategory;
function updateCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryUpdated = req.body;
        console.log('update', categoryUpdated);
        const id = parseInt(req.params.categoryId);
        console.log('id', id);
        const resp = yield mysql_controller_1.updateRow('categoria', 'categoria_id', id, categoryUpdated).then((resp) => resp[0]);
        if (resp.changedRows) {
            return res.json({
                message: 'Category updated'
            });
        }
        if (!resp.changedRows && !resp.affectedRows) {
            return res.json({
                message: 'Category updated'
            });
        }
        else {
            return res.json({
                message: 'error'
            });
        }
    });
}
exports.updateCategory = updateCategory;
function deleteCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryId = req.params.categoryId;
        const resp = yield mysql_controller_1.deleteRow('categoria', 'categoria_id', categoryId);
        if (resp.affectedRows) {
            return res.json({
                message: 'Category deleted'
            });
        }
        if (!resp.affectedRows && !resp.warningStatus) {
            return res.json({
                message: 'Category deleted'
            });
        }
        else {
            return res.json({
                message: 'error'
            });
        }
    });
}
exports.deleteCategory = deleteCategory;
