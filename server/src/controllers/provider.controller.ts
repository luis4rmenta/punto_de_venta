import { Request, Response } from 'express';
import { connect, DataBaseConnection } from '../database';
import { MySQLDeletedResponse } from '../interfaces/mySQLDeletedResponse.interface';
import { MySQLInsertResponse } from '../interfaces/mySQLInsertResponse.interface';
import { MySQLUpdateResponse } from '../interfaces/mySQLUpdatedResponse.interface';
import { Provider } from '../interfaces/provider.interface';
import { deleteRow, getRow, getTable, updateRow } from './mysql.controller';


export async function getProviders(req: Request, res: Response): Promise<Response> {
    try {
        const providers = await getTable('proveedor');
        console.log(providers);

        return res.json(providers);
    } catch (error) {
        console.error(error);
        return res.json({
            message: 'error'
        });
    }
}

export async function getProvider(req: Request, res: Response): Promise<Response> {
    try {
        const providerId = parseInt(req.params.providerId);
        const provider: Provider = await getRow('proveedor', 'proveedor_id', providerId.toString()).then((resp: any) => resp[0]);

        return res.json(provider);
    } catch (error) {
        console.error(error);
        return res.json({
            message: 'error'
        });
    }
}

export async function newProvider(req: Request, res: Response): Promise<Response> {
    try {
        const conn  =  await DataBaseConnection.getInstance().getConnection()
        const newProvider: Provider = req.body;

        const resp: MySQLInsertResponse = await conn.query(`INSERT INTO proveedor (persona_id, organizacion, estado_id, fecha) values (?, ?, ?, ?);`, [newProvider.persona_id, newProvider.organizacion, newProvider.estado_id, newProvider.fecha]).then((resp: any) => resp[0]);
        if (resp.affectedRows) {
            return res.json({
                message: 'provider added',
                providerId: resp.insertId
            });
        } else {
            return res.json({
                message: 'error'
            });
        }
    } catch (error) {
        console.error(error);
        return res.json({
            message: 'error'
        });
    }
}

export async function updateProvider(req: Request, res: Response): Promise<Response> {
    try {
        const updatedProvider: Provider = req.body;
        const providerId = parseInt(req.params.providerId);
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
    } catch (error) {
        console.error(error);
        console.log('Ha ocurrido un error');
        return res.json({
            message: 'errror'
        });
    }
}

export async function deleteProvider(req: Request, res: Response): Promise<Response> {
    try {
        const providerId = req.params.providerId;
        const resp: MySQLDeletedResponse = await deleteRow('proveedor', 'proveedor_id', providerId);

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
    } catch (error) {
        console.error(error);
        return res.json({
            message: 'error'
        });
    }
}