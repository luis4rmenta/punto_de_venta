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
exports.findProductByName = exports.findProductByCodebar = exports.deleteProduct = exports.updateProduct = exports.newProduct = exports.getProduct = exports.getProducts = void 0;
const database_1 = require("../database");
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        const products = yield conn.query('SELECT * FROM producto;');
        return res.json(products[0]);
    });
}
exports.getProducts = getProducts;
function getProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.productId;
        const conn = yield database_1.connect();
        const product = yield conn.query('select * from producto WHERE producto_id = ?', [id]).then((resp) => resp[0]);
        return res.json(product[0]);
    });
}
exports.getProduct = getProduct;
function newProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = req.body;
        const conn = yield database_1.connect();
        const resp = yield conn.query(`insert into producto (
                                nombre, 
                                codigo_de_barras,
                                estado_id, 
                                fecha_de_creacion, 
                                costo, 
                                precio, 
                                stock, 
                                categoria_id
                              ) 
        values (?, ?, ?, ?, ?, ?, ?, ?);`, [
            product.nombre,
            product.codigo_de_barras,
            product.estado_id,
            product.fecha_de_creacion,
            product.costo,
            product.precio,
            product.stock,
            product.categoria_id
        ]).then((resp) => resp[0]);
        return res.json({
            message: 'Product added',
            productId: resp.insertId
        });
    });
}
exports.newProduct = newProduct;
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.productId;
        const updatedProduct = req.body;
        const conn = yield database_1.connect();
        yield conn.query(`UPDATE producto set ? where producto_id = ?`, [updatedProduct, id]);
        return res.json({
            message: "product updated"
        });
    });
}
exports.updateProduct = updateProduct;
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.productId;
        const conn = yield database_1.connect();
        yield conn.query('DELETE FROM producto where producto_id = ?', [id]);
        return res.json({
            message: "Product deleted"
        });
    });
}
exports.deleteProduct = deleteProduct;
function findProductByCodebar(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const codebar = req.params.codebar;
        const conn = yield database_1.connect();
        const product = yield conn.query(`select * from producto where codigo_de_barras = ?`, [codebar]).then((res) => res[0][0]);
        return res.json(product);
    });
}
exports.findProductByCodebar = findProductByCodebar;
function findProductByName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = req.params.productName;
        const conn = yield database_1.connect();
        const products = yield conn.query(`
    SELECT * FROM producto WHERE nombre LIKE "%${name}%";`).then();
        return res.json(products[0]);
    });
}
exports.findProductByName = findProductByName;
