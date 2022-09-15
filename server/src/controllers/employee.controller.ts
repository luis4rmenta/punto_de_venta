import { Request, response, Response } from "express";

import { connect, DataBaseConnection } from '../database';
import { Employee } from '../interfaces/employee.interface';
import { MySQLInsertResponse } from "../interfaces/mySQLInsertResponse.interface";



export async function getEmployees(req: Request, res: Response): Promise<Response> {
    const conn  =  await DataBaseConnection.getInstance().getConnection()
    const employees = await conn.query(`SELECT empleado_id, persona_id, tipo_empleado_id, DATE_FORMAT(fecha, '%Y-%m-%d') as fecha FROM empleado;`);
    return res.json(employees[0]);
}

export async function AddEmployee(req: Request, res: Response): Promise<Response> {
  const conn  =  await DataBaseConnection.getInstance().getConnection()

    if (req.body.employee) {
    const fecha_de_contrato = req.body.employee.fecha;
    const newEmployee: Employee = Object.assign(req.body.employee, req.body.person);
    const resp1: MySQLInsertResponse = await conn.query('INSERT INTO persona (curp, nombre, primer_apellido, segundo_apellido, direccion, telefono, email, genero, fecha_de_nacimiento) values (?, ?, ?, ?, ?, ?, ?, ?, ?);', [newEmployee.curp, newEmployee.nombre, newEmployee.primer_apellido, newEmployee.segundo_apellido, newEmployee.direccion, newEmployee.telefono, newEmployee.email, newEmployee.genero, newEmployee.fecha_de_nacimiento]).then((resp: any )=> resp[0]);
    const personId: number = resp1.insertId;
    const resp2: MySQLInsertResponse = await conn.query('INSERT INTO empleado (persona_id, tipo_empleado_id, fecha) values (?, ?, ?);', [personId, newEmployee.tipo_empleado_id, fecha_de_contrato]).then((resp: any )=> resp[0]);

    if (resp1.affectedRows && resp2.affectedRows) {
        return res.json({
            message: 'Employee created',
            personId: resp1.insertId,
            employeeId: resp2.insertId
        });
    } else {
        return res.status(401).json({
            message: 'error'
        });
    }

    } else {
        const newEmployee = req.body;
        const resp: MySQLInsertResponse = await conn.query('INSERT INTO empleado (tipo_empleado_id, fecha) values (?, ?);', [newEmployee.tipo_empleado_id, newEmployee.fecha_de_contrato]).then((resp: any )=> resp[0]);
        
        if (resp.affectedRows) {
            return res.json({
                message: 'Employee created',
                employeeId: resp.insertId
            });
        } else {
            return res.status(401).json({
                message: 'error'
            });
        }
    }
}

export async function getEmployee(req:Request, res: Response): Promise<Response>{
    const id = req.params.employeeId;
    const conn  =  await DataBaseConnection.getInstance().getConnection()
    const empleados = await conn.query(`
    SELECT 
        empleado_id, persona_id, 
        tipo_empleado_id, DATE_FORMAT(fecha, '%Y-%m-%d') as fecha 
    FROM 
    empleado WHERE empleado_id = ?;`, [id]).then((resp: any) => resp[0][0]);
    return res.json(empleados);
}

export async function deleteEmployee(req: Request, res: Response): Promise<Response> {
    const id = req.params.employeeId
    const conn  =  await DataBaseConnection.getInstance().getConnection()
    await conn.query('DELETE FROM empleado where empleado_id = ?', [id]);
    return res.json({
        message: 'Employee deleted'
    });
}

export async function updateEmployee(req: Request, res:Response): Promise<Response>{
    const id = req.params.employeeId;
    const updateEmployee: {
        empleado_id?: number,
        persona_id?: string,
        tipo_empleado_id: string,
        fecha: string 
    } = req.body;
    const conn  =  await DataBaseConnection.getInstance().getConnection()
    await conn.query('UPDATE empleado set ? where empleado_id = ?;',[updateEmployee, id]);
    return res.json({
        message: 'Employee updated'
    });
}