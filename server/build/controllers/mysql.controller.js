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
const conn = database_1.connect();
function getTable(tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return (yield conn).query(`SELECT * FROM ${tableName};`).then((resp) => resp[0]);
        }
        catch (error) {
            console.error(error);
            return [];
        }
    });
}
exports.getTable = getTable;
function getRow(tableName, where, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return (yield conn).query(`SELECT * FROM ${tableName} WHERE ${where} =?;`, [value]).then((resp) => resp[0]);
        }
        catch (error) {
            console.error(error);
            return;
        }
    });
}
exports.getRow = getRow;
function getRows(tableName, where, value) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return (yield conn).query(`SELECT * FROM ${tableName} WHERE ${where}=?;`, [value]).then((resp) => resp[0]);
        }
        catch (error) {
            console.error(error);
            return;
        }
    });
}
exports.getRows = getRows;
function updateRow(tableName, where, whereValue, updatedField) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return (yield conn).query(`UPDATE ${tableName} SET ? WHERE ${where} = ?;`, [updatedField, whereValue]).then((resp) => resp);
        }
        catch (error) {
            console.error(error);
            const resp = {
                affectedRows: 0,
                changedRows: 0,
                fieldCount: 0,
                info: '',
                insertId: 0,
                serverStatus: 1,
                warningStatus: 1
            };
            return resp;
        }
    });
}
exports.updateRow = updateRow;
function deleteRow(tableName, where, whereValue) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return (yield conn).query(`DELETE FROM ${tableName} WHERE ${where} = ${whereValue};`).then((resp) => resp[0]);
        }
        catch (error) {
            const resp = {
                affectedRows: 0,
                fieldCount: 0,
                info: '',
                insertId: 0,
                serverStatus: 1,
                warningStatus: 1
            };
            return resp;
        }
    });
}
exports.deleteRow = deleteRow;
