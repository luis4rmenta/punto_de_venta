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
exports.deleteOutputDetail = exports.updateOutputDetail = exports.newOutputDetails = exports.newOutputDetail = exports.getOutputDetail = exports.getOutputDetails = void 0;
const database_1 = require("../database");
const mysql_controller_1 = require("./mysql.controller");
function getOutputDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const outputDetails = yield mysql_controller_1.getTable('detalle_salida');
        return res.json(outputDetails);
    });
}
exports.getOutputDetails = getOutputDetails;
function getOutputDetail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const outputDetailId = parseInt(req.params.inputDetailId);
        const outputDetail = yield mysql_controller_1.getRow('venta', 'detalle_entrada_id', outputDetailId);
        return res.json(outputDetail);
    });
}
exports.getOutputDetail = getOutputDetail;
function newOutputDetail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newOutputDetail = req.body;
        const conn = yield database_1.connect();
        const resp = yield conn.query(`INSERT INTO detalle_venta (venta_id, costo_unitario, precio_unitario, cantidad, producto_id) values (?, ?, ?, ?, ?);`, [newOutputDetail.venta_id, newOutputDetail.costo_unitario, newOutputDetail.precio_unitario, newOutputDetail.cantidad, newOutputDetail.producto_id]).then((resp) => resp[0]);
        if (resp.affectedRows) {
            return res.json({
                message: 'new output detail created',
                outputDetailId: resp.insertId
            });
        }
        else {
            return res.json({
                message: 'error',
                outPutDetailId: 0
            });
        }
    });
}
exports.newOutputDetail = newOutputDetail;
function newOutputDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        const newOutputDetails = req.body.outputDetails;
        let outputDetailIds = [];
        let well = false;
        let resp = {};
        newOutputDetails.forEach((newOutputDetail) => __awaiter(this, void 0, void 0, function* () {
            resp = yield conn.query(`INSERT INTO detalle_venta (venta_id, costo_unitario, precio_unitario, cantidad, producto_id) values (?, ?, ?, ?, ?);`, [newOutputDetail.venta_id, newOutputDetail.costo_unitario, newOutputDetail.precio_unitario, newOutputDetail.cantidad, newOutputDetail.producto_id]).then((resp) => resp[0]);
            // if (resp.affectedRows || resp.insertId) {
            //     console.log('ewll is true');
            //     well = true;
            //     outputDetailIds.push(resp.insertId);
            // } else {
            //     console.log('well is false');
            //     well = false;
            // }
        }));
        return res.json({ message: 'success' });
        // console.log('well es', well);
        // if (well) {
        //     return res.json({
        //         message: 'success',
        //         outputDetailId: outputDetailIds
        //     });
        // } else {
        //     return res.json({
        //         message: 'error',
        //     });
        // }
    });
}
exports.newOutputDetails = newOutputDetails;
function updateOutputDetail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const outputDetailId = parseInt(req.params.outputDetailId);
        const outputDetailUpdated = req.body;
        const resp = yield mysql_controller_1.updateRow('detalle_venta', 'detalle_venta_id', outputDetailId, outputDetailId);
        if (resp.changedRows) {
            return res.json({
                message: 'Output Detail Changed'
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
exports.updateOutputDetail = updateOutputDetail;
function deleteOutputDetail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const outputDetailId = parseInt(req.params.outputDetailId);
        const resp = yield mysql_controller_1.deleteRow('detalle_venta', 'detalle_venta_id', outputDetailId);
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
exports.deleteOutputDetail = deleteOutputDetail;
