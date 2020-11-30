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
exports.updateEmployee = exports.deleteEmployee = exports.getEmployee = exports.AddEmployee = exports.getEmployees = void 0;
const database_1 = require("../database");
function getEmployees(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        const employees = yield conn.query(`SELECT empleado_id, persona_id, tipo_empleado_id, DATE_FORMAT(fecha, '%Y-%m-%d') as fecha FROM empleado;`);
        return res.json(employees[0]);
    });
}
exports.getEmployees = getEmployees;
function AddEmployee(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        if (req.body.employee) {
            const fecha_de_contrato = req.body.employee.fecha;
            const newEmployee = Object.assign(req.body.employee, req.body.person);
            const resp1 = yield conn.query('INSERT INTO persona (curp, nombre, primer_apellido, segundo_apellido, direccion, telefono, email, genero, fecha_de_nacimiento) values (?, ?, ?, ?, ?, ?, ?, ?, ?);', [newEmployee.curp, newEmployee.nombre, newEmployee.primer_apellido, newEmployee.segundo_apellido, newEmployee.direccion, newEmployee.telefono, newEmployee.email, newEmployee.genero, newEmployee.fecha_de_nacimiento]).then((resp) => resp[0]);
            const personId = resp1.insertId;
            const resp2 = yield conn.query('INSERT INTO empleado (persona_id, tipo_empleado_id, fecha) values (?, ?, ?);', [personId, newEmployee.tipo_empleado_id, fecha_de_contrato]).then((resp) => resp[0]);
            if (resp1.affectedRows && resp2.affectedRows) {
                return res.json({
                    message: 'Employee created',
                    personId: resp1.insertId,
                    employeeId: resp2.insertId
                });
            }
            else {
                return res.status(401).json({
                    message: 'error'
                });
            }
        }
        else {
            const newEmployee = req.body;
            const resp = yield conn.query('INSERT INTO empleado (tipo_empleado_id, fecha) values (?, ?);', [newEmployee.tipo_empleado_id, newEmployee.fecha_de_contrato]).then((resp) => resp[0]);
            if (resp.affectedRows) {
                return res.json({
                    message: 'Employee created',
                    employeeId: resp.insertId
                });
            }
            else {
                return res.status(401).json({
                    message: 'error'
                });
            }
        }
    });
}
exports.AddEmployee = AddEmployee;
function getEmployee(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.employeeId;
        const conn = yield database_1.connect();
        const empleados = yield conn.query(`
    SELECT 
        empleado_id, persona_id, 
        tipo_empleado_id, DATE_FORMAT(fecha, '%Y-%m-%d') as fecha 
    FROM 
    empleado WHERE empleado_id = ?;`, [id]).then((resp) => resp[0][0]);
        return res.json(empleados);
    });
}
exports.getEmployee = getEmployee;
function deleteEmployee(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.employeeId;
        const conn = yield database_1.connect();
        yield conn.query('DELETE FROM empleado where empleado_id = ?', [id]);
        return res.json({
            message: 'Employee deleted'
        });
    });
}
exports.deleteEmployee = deleteEmployee;
function updateEmployee(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.employeeId;
        const updateEmployee = req.body;
        const conn = yield database_1.connect();
        yield conn.query('UPDATE empleado set ? where empleado_id = ?;', [updateEmployee, id]);
        return res.json({
            message: 'Employee updated'
        });
    });
}
exports.updateEmployee = updateEmployee;
