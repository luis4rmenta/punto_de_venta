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
exports.deleteRow = exports.updateRow = exports.getRows = exports.getRow = exports.getTable = void 0;
const database_1 = require("../database");
function getTable(tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        return yield conn.query(`SELECT * FROM ${tableName};`).then((resp) => resp[0]);
    });
}
exports.getTable = getTable;
function getRow(tableName, where, value) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        return yield conn.query(`SELECT * FROM ${tableName} WHERE ${where} =?;`, [value]).then((resp) => resp[0]);
    });
}
exports.getRow = getRow;
function getRows(tableName, where, value) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        console.log(`SELECT * FROM ${tableName} WHERE ${where} = ${value};`);
        return yield conn.query(`SELECT * FROM ${tableName} WHERE ${where}=?;`, [value]).then((resp) => resp[0]);
    });
}
exports.getRows = getRows;
function updateRow(tableName, where, whereValue, updatedField) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        console.log(`UPDATE ${tableName} SET ${updatedField} WHERE ${where} = ${whereValue};`);
        return yield conn.query(`UPDATE ${tableName} SET ? WHERE ${where} = ?;`, [updatedField, whereValue]).then((resp) => resp);
    });
}
exports.updateRow = updateRow;
function deleteRow(tableName, where, whereValue) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        return yield conn.query(`DELETE FROM ${tableName} WHERE ${where} = ${whereValue};`).then((resp) => resp[0]);
    });
}
exports.deleteRow = deleteRow;
