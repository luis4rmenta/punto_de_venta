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
exports.deleteProvider = exports.updateProvider = exports.newProvider = exports.getProvider = exports.getProviders = void 0;
const database_1 = require("../database");
const mysql_controller_1 = require("./mysql.controller");
function getProviders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const providers = yield mysql_controller_1.getTable('proveedor');
        console.log(providers);
        return res.json(providers);
    });
}
exports.getProviders = getProviders;
function getProvider(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const providerId = parseInt(req.params.providerId);
        const provider = yield mysql_controller_1.getRow('proveedor', 'proveedor_id', providerId.toString());
        return res.json(provider);
    });
}
exports.getProvider = getProvider;
function newProvider(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        const newProvider = req.body;
        const resp = yield conn.query(`INSERT INTO proveedor (persona_id, organizacion, estado_id, fecha) values (?, ?, ?, ?);`, [newProvider.persona_id, newProvider.organizacion, newProvider.estado_id, newProvider.fecha]).then((resp) => resp[0]);
        if (resp.affectedRows) {
            return res.json({
                message: 'provider added'
            });
        }
        else {
            return res.json({
                message: 'error'
            });
        }
    });
}
exports.newProvider = newProvider;
function updateProvider(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedProvider = req.body;
        console.log(updatedProvider, '--------------------------');
        const providerId = req.body.proveedor_id;
        console.log(providerId);
        const resp = yield mysql_controller_1.updateRow('proveedor', 'proveedor_id', providerId, updatedProvider);
        console.log(resp);
        if (resp.changedRows) {
            return res.json({
                message: 'provider updated'
            });
        }
        if (!resp.changedRows && !resp.warningStatus) {
            return res.json({
                message: 'provider updated'
            });
        }
        else {
            return res.json({
                message: 'errror'
            });
        }
    });
}
exports.updateProvider = updateProvider;
function deleteProvider(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const providerId = req.params.providerId;
        const resp = yield mysql_controller_1.deleteRow('proveedor', 'proveedor_id', providerId);
        if (resp.affectedRows) {
            return res.json({
                message: 'provider deleted'
            });
        }
        if (!resp.affectedRows && !resp.warningStatus) {
            return res.json({
                message: 'provider deleted'
            });
        }
        else {
            return res.json({
                message: 'error'
            });
        }
    });
}
exports.deleteProvider = deleteProvider;
