import { Request, Response } from 'express';
import { connect } from '../database';
import { MySQLDeletedResponse } from '../interfaces/mySQLDeletedResponse.interface';
import { MySQLInsertResponse } from '../interfaces/mySQLInsertResponse.interface';
import { MySQLUpdateResponse } from '../interfaces/mySQLUpdatedResponse.interface';
import { Provider } from '../interfaces/provider.interface';
import { deleteRow, getRow, getTable, updateRow } from './mysql.controller';


export async function getProviders(req: Request, res: Response): Promise<Response> {
    const providers = await getTable('proveedor');
    console.log(providers);

    return res.json(providers);
}

export async function getProvider(req: Request, res: Response): Promise<Response> {
    const providerId = parseInt(req.params.providerId);
    const provider: Provider = await getRow('proveedor', 'proveedor_id', providerId.toString());

    return res.json(provider);
}

export async function newProvider(req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    const newProvider: Provider = req.body;
    
    const resp: MySQLInsertResponse = await conn.query(`INSERT INTO proveedor (persona_id, organizacion, estado_id, fecha) values (?, ?, ?, ?);`, [newProvider.persona_id, newProvider.organizacion, newProvider.estado_id, newProvider.fecha]).then((resp: any) => resp[0]);
    if (resp.affectedRows) {
        return res.json({
            message: 'provider added'
        });
    } else {
        return res.json({
            message: 'error'
        });
    }
}

export async function updateProvider(req: Request, res: Response): Promise<Response> {
    const updatedProvider: Provider = req.body;
    console.log(updatedProvider, '--------------------------');
    const providerId: string = req.body.proveedor_id;
    console.log(providerId);
    const resp: MySQLUpdateResponse = await updateRow('proveedor', 'proveedor_id', providerId, updatedProvider);
    console.log(resp);
    if (resp.changedRows) {
        return res.json({
            message: 'provider updated'
        });
    } if (!resp.changedRows && !resp.warningStatus) {
        return res.json({
            message: 'provider updated'
        });
    } else {
        return res.json({
            message: 'errror'
        });
    }
}

export async function deleteProvider(req: Request, res: Response): Promise<Response> {
    const providerId = req.params.providerId;
    const resp:MySQLDeletedResponse = await deleteRow('proveedor', 'proveedor_id', providerId);

    if (resp.affectedRows) {
        return res.json({
            message: 'provider deleted'
        });
    } if (!resp.affectedRows && !resp.warningStatus) {
        return res.json({
            message: 'provider deleted'
        });
    } else {
        return res.json({
            message: 'error'
        });
    }
}