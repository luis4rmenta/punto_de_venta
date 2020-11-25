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
exports.deleteOutPut = exports.updateOutput = exports.newOutput = exports.getOutput = exports.getOutputs = void 0;
const mysql_controller_1 = require("./mysql.controller");
const database_1 = require("../database");
function getOutputs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const outputs = yield mysql_controller_1.getTable('venta');
        return res.json(outputs);
    });
}
exports.getOutputs = getOutputs;
function getOutput(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const outputId = parseInt(req.params.outputId);
        const output = yield mysql_controller_1.getRow('venta', 'venta_id', outputId);
        return res.json(output);
    });
}
exports.getOutput = getOutput;
function newOutput(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newOutput = req.body;
        const conn = yield database_1.connect();
        const resp = yield conn.query(`INSERT INTO vemta (total, fecha, estado_id, empleado_id) values (?, ?, ?, ?);`, [newOutput.total, newOutput.fecha, newOutput.estado_id, newOutput.empleado_id]);
        return res.json(resp);
    });
}
exports.newOutput = newOutput;
function updateOutput(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const outputId = parseInt(req.params.outputId);
        const outputUpdated = req.body;
        const resp = yield mysql_controller_1.updateRow('venta', 'venta_id', outputId, outputUpdated);
        if (resp.changedRows) {
            return res.json({
                message: 'Output Changed'
            });
        }
        if (!resp.changedRows && !resp.warningStatus) {
            return res.json({
                message: 'Error'
            });
        }
        else {
            return res.json({
                message: 'Error'
            });
        }
    });
}
exports.updateOutput = updateOutput;
function deleteOutPut(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const outputId = parseInt(req.params.outputId);
        const resp = yield mysql_controller_1.deleteRow('venta', 'venta_id', outputId);
        if (resp.affectedRows) {
            return res.json({
                message: 'output deleted'
            });
        }
        if (resp.warningStatus) {
            return res.json({
                message: 'output deleted'
            });
        }
        else {
            return res.json({
                message: 'error'
            });
        }
    });
}
exports.deleteOutPut = deleteOutPut;
