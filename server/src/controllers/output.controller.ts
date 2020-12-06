import { Output } from '../interfaces/output.interface'
import { deleteRow, getRow, getTable, updateRow } from './mysql.controller'

import { Request, Response } from 'express';
import { OutputDetail } from '../interfaces/outputDetail.interface';
import { connect } from '../database';
import { MySQLUpdateResponse } from '../interfaces/mySQLUpdatedResponse.interface';
import { MySQLDeletedResponse } from '../interfaces/mySQLDeletedResponse.interface';
import { MySQLInsertResponse } from '../interfaces/mySQLInsertResponse.interface';
import { Person } from '../interfaces/person.interface';
import { UserI } from '../interfaces/user.interface';


export async function getOutputs(req: Request, res: Response): Promise<Response> {
    const outputs: Output[] = await getTable('venta');
    return res.json(outputs);
}

export async function getOutput(req: Request, res: Response): Promise<Response> {
    const outputId: number = parseInt(req.params.outputId);
    const output: Output = await getRow('venta', 'venta_id', outputId);
    return res.json(output);
}

export async function newOutput(req: Request | any, res: Response): Promise<Response> {
    const conn = await connect();
    let newOutput: Output = req.body;
    
    const user: UserI = await conn.query(`select * from usuario where usuario_id = ?;`, req.userId).then((resp: any) => resp[0][0]);
    
    newOutput.empleado_id = user.empleado_id;
    const resp: MySQLInsertResponse = await conn.query(`
    INSERT 
        INTO 
            venta 
            (total, fecha, estado_id, empleado_id) 
                values 
                (?, ?, ?, ?);`, [newOutput.total, newOutput.fecha, 
                    newOutput.estado_id, newOutput.empleado_id]).then((res: any) => res[0]);
    return res.json({message: 'output created', outputId: resp.insertId});
}

export async function updateOutput(req: Request, res: Response): Promise<Response> {
    const outputId: number = parseInt(req.params.outputId);
    const outputUpdated: Output = req.body;
    const resp: MySQLUpdateResponse = await updateRow('venta', 'venta_id', outputId, outputUpdated);
    if (resp.changedRows) {
        return res.json({
            message: 'Output Changed'
        })
    } if (!resp.changedRows && !resp.warningStatus) {
        return res.json({
            message: 'Error'
        })
    } else {
        return res.json({
            message: 'Error'
        })
    }
}

export async function deleteOutPut(req: Request, res: Response): Promise<Response> {
    const outputId: number = parseInt(req.params.outputId);
    const resp: MySQLDeletedResponse = await deleteRow('venta', 'venta_id', outputId);
    if (resp.affectedRows) {
        return res.json({
            message: 'output deleted'
        });
    } if (resp.warningStatus) {
        return res.json({
            message: 'output deleted'
        });
    } else {
        return res.json({
            message: 'error'
        });
    }
}

