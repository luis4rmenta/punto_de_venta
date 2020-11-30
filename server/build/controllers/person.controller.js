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
exports.deletePerson = exports.updatePerson = exports.newPerson = exports.getPerson = exports.getPeople = void 0;
const database_1 = require("../database");
const mysql_controller_1 = require("./mysql.controller");
function getPeople(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const people = yield mysql_controller_1.getTable('persona');
        return res.json(people);
    });
}
exports.getPeople = getPeople;
function getPerson(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const personId = parseInt(req.params.personId);
        const person = yield mysql_controller_1.getRow('persona', 'person_id', personId).then((resp) => resp[0]);
        return res.json(person);
    });
}
exports.getPerson = getPerson;
function newPerson(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newPerson = req.body;
        const conn = yield database_1.connect();
        console.log(newPerson.segundo_apellido);
        console.log(JSON.stringify(newPerson));
        const resp = yield conn.query(`insert into persona ( 
        curp, 
        nombre, 
        primer_apellido, 
        segundo_apellido, 
        direccion, telefono, 
        email, 
        genero, 
        fecha_de_nacimiento ) values (?, ?, ?, ?, ?, ?, ?, ?, ?);`, [newPerson.curp,
            newPerson.nombre, newPerson.primer_apellido, newPerson.segundo_apellido,
            newPerson.direccion, newPerson.telefono, newPerson.email, newPerson.genero,
            newPerson.fecha_de_nacimiento]).then((resp) => resp[0]);
        if (resp.affectedRows) {
            return res.json({
                message: 'person added',
                person_id: resp.insertId
            });
        }
        else {
            return res.json({
                message: 'error'
            });
        }
    });
}
exports.newPerson = newPerson;
function updatePerson(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const personUpdated = req.body;
        const personId = parseInt(req.params.personId);
        const resp = yield mysql_controller_1.updateRow('persona', 'person_id', personId, personUpdated);
        if (resp.changedRows) {
            return res.json({
                message: 'Person updated'
            });
        }
        if (!resp.changedRows && !resp.affectedRows) {
            return res.json({
                message: 'Person updated'
            });
        }
        else {
            return res.json({
                message: 'error'
            });
        }
    });
}
exports.updatePerson = updatePerson;
function deletePerson(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const personId = parseInt(req.params.personId);
        const resp = yield mysql_controller_1.deleteRow('persona', 'person_id', personId.toString());
        if (resp.affectedRows) {
            return res.json({
                message: 'Person deleted'
            });
        }
        if (!resp.affectedRows && !resp.warningStatus) {
            return res.json({
                message: 'Person deleted'
            });
        }
        else {
            return res.json({
                message: 'error'
            });
        }
    });
}
exports.deletePerson = deletePerson;
