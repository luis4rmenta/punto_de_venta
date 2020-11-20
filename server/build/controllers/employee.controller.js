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
        const employees = yield conn.query(`SELECT 
                    e.empleado_id, 
                    p.curp,
                    p.nombre, 
                    p.primer_apellido, 
                    p.fecha_de_nacimiento, 
                    p.genero, p.telefono, 
                    p.email, 
                    p.direccion,
                    e.fecha as 'Empleado desde',
                    te.tipo_de_empleado
                FROM
                    persona as p
                inner join
                    empleado as e
                    on p.person_id = e.persona_id
                inner join
                    tipo_empleado as te
                    on e.tipo_empleado_id = te.tipo_empleado_id`);
        return res.json(employees[0]);
    });
}
exports.getEmployees = getEmployees;
function AddEmployee(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newEmployee = req.body;
        const conn = yield database_1.connect();
        yield conn.query('INSERT INTO persona (curp, nombre, primer_apellido, segundo_apellido, direccion, telefono, email, genero, fecha_de_nacimiento) values (?, ?, ?, ?, ?, ?, ?, ?, ?);', [newEmployee.curp, newEmployee.nombre, newEmployee.primer_apellido, newEmployee.segundo_apellido, newEmployee.direccion, newEmployee.telefono, newEmployee.email, newEmployee.genero, newEmployee.fecha_de_nacimiento]);
        yield conn.query('INSERT INTO empleado (tipo_empleado_id, fecha) values (?, ?);', [newEmployee.tipo_empleado_id, newEmployee.fecha_de_contrato]);
        return res.json({
            message: 'Post Created',
            employee: newEmployee
        });
    });
}
exports.AddEmployee = AddEmployee;
function getEmployee(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.employeeId;
        const conn = yield database_1.connect();
        const empleados = yield conn.query(`SELECT 
                    e.empleado_id, 
                    p.curp,
                    p.nombre, 
                    p.primer_apellido, 
                    p.fecha_de_nacimiento, 
                    p.genero, p.telefono, 
                    p.email, 
                    p.direccion,
                    e.fecha as 'Empleado desde',
                    te.tipo_de_empleado
                FROM
                    persona as p
                inner join
                    empleado as e
                    on p.person_id = e.persona_id
                inner join
                    tipo_empleado as te
                    on e.tipo_empleado_id = te.tipo_empleado_id
                WHERE e.empleado_id = ?;`, [id]);
        return res.json(empleados[0]);
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
            message: 'Employexe updated'
        });
    });
}
exports.updateEmployee = updateEmployee;
