import { Request, response, Response } from "express";

import { connect } from '../database';
import { Employee } from '../interfaces/employee.interface';



export async function getEmployees(req: Request, res: Response): Promise<Response> {
    const conn  =  await connect();
    const employees = await conn.query(`SELECT 
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
}

export async function AddEmployee(req: Request, res: Response): Promise<Response> {
    const newEmployee: Employee = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO persona (curp, nombre, primer_apellido, segundo_apellido, direccion, telefono, email, genero, fecha_de_nacimiento) values (?, ?, ?, ?, ?, ?, ?, ?, ?);', [newEmployee.curp, newEmployee.nombre, newEmployee.primer_apellido, newEmployee.segundo_apellido, newEmployee.direccion, newEmployee.telefono, newEmployee.email, newEmployee.genero, newEmployee.fecha_de_nacimiento])
    await conn.query('INSERT INTO empleado (tipo_empleado_id, fecha) values (?, ?);', [newEmployee.tipo_empleado_id, newEmployee.fecha_de_contrato]);

    return res.json({
        message: 'Post Created',
        employee: newEmployee
    });
}

export async function getEmployee(req:Request, res: Response): Promise<Response>{
    const id = req.params.employeeId;
    const conn = await connect();
    const empleados = await conn.query(`SELECT 
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
}

export async function deleteEmployee(req: Request, res: Response): Promise<Response> {
    const id = req.params.employeeId
    const conn = await connect();
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
    const conn = await connect();
    await conn.query('UPDATE empleado set ? where empleado_id = ?;',[updateEmployee, id]);
    return res.json({
        message: 'Employexe updated'
    });
}