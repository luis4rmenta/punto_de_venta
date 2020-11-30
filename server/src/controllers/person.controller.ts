import { Request, Response } from 'express';
import { connect } from '../database';
import { MySQLDeletedResponse } from '../interfaces/mySQLDeletedResponse.interface';
import { MySQLInsertResponse } from '../interfaces/mySQLInsertResponse.interface';
import { Person } from '../interfaces/person.interface';
import { deleteRow, getRow, getTable, updateRow } from './mysql.controller';

export async function getPeople(req: Request, res: Response): Promise<Response> {
    const people: Person[] = await getTable('persona');
    return res.json(people);
}

export async function getPerson(req: Request, res: Response): Promise<Response> {
    const personId: number = parseInt(req.params.personId);
    const person: Person = await getRow('persona', 'person_id', personId).then((resp: any) => resp[0]);
    return res.json(person);
} 

export async function newPerson(req: Request, res: Response): Promise<Response> {
    const newPerson: Person = req.body;
    const conn = await connect();
    console.log(newPerson.segundo_apellido);
    console.log(JSON.stringify(newPerson));

    const resp: MySQLInsertResponse = await conn.query(`insert into persona ( 
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
            newPerson. fecha_de_nacimiento]).then((resp: any) => resp[0]);
    
    if (resp.affectedRows) {
        return res.json({
            message: 'person added',
            person_id: resp.insertId
        });
    } else {
        return res.json({
            message: 'error'
        });
    }
} 


export async function updatePerson(req: Request, res: Response): Promise<Response> {
    const personUpdated: Person = req.body;
    const personId: number = parseInt(req.params.personId);
    const resp = await updateRow('persona', 'person_id', personId, personUpdated);
    
    if (resp.changedRows) {
        return res.json({
            message: 'Person updated'
        });
    } if (!resp.changedRows && !resp.affectedRows) {
        return res.json({
            message: 'Person updated'
        });
    } else {
        return res.json({
            message: 'error'
        });
    }
} 

export async function deletePerson(req: Request, res: Response): Promise<Response> {
    const personId: number = parseInt(req.params.personId);
    const resp: MySQLDeletedResponse = await deleteRow('persona', 'person_id', personId.toString());

    if (resp.affectedRows) {
        return res.json({
            message: 'Person deleted'
        });
    } if (!resp.affectedRows && !resp.warningStatus) {
        return res.json({
            message: 'Person deleted'
        });
    } else {
        return res.json({
            message: 'error'
        });
    }
} 