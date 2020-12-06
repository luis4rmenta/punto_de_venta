import { Request, Response } from 'express';
import { connect } from '../database';
import { MySQLDeletedResponse } from '../interfaces/mySQLDeletedResponse.interface';
import { MySQLInsertResponse } from '../interfaces/mySQLInsertResponse.interface';
import { MySQLUpdateResponse } from '../interfaces/mySQLUpdatedResponse.interface';
import { OutputDetail } from '../interfaces/outputDetail.interface';
import { deleteRow, getRow, getTable, updateRow } from './mysql.controller';

export async function getOutputDetails(req: Request, res: Response): Promise<Response> {
    const outputDetails: OutputDetail[] = await getTable('detalle_salida');
    return res.json(outputDetails);
}

export async function getOutputDetail(req: Request, res: Response): Promise<Response> {
    const outputDetailId: number = parseInt(req.params.inputDetailId);
    const outputDetail: OutputDetail = await getRow('venta', 'detalle_entrada_id', outputDetailId);
    return res.json(outputDetail);
}

export async function newOutputDetail(req: Request, res: Response): Promise<Response> {
    const newOutputDetail: OutputDetail = req.body;
    const conn = await connect();
    const resp: MySQLInsertResponse = await conn.query(`INSERT INTO detalle_venta (venta_id, costo_unitario, precio_unitario, cantidad, producto_id) values (?, ?, ?, ?, ?);`, [newOutputDetail.venta_id, newOutputDetail.costo_unitario, newOutputDetail.precio_unitario, newOutputDetail.cantidad, newOutputDetail.producto_id]).then((resp: any) => resp[0])
    if (resp.affectedRows) {
        return res.json({
            message: 'new output detail created',
            outputDetailId: resp.insertId
        });
    } else {
        return res.json({
            message: 'error',
            outPutDetailId: 0
        });
    }
}

export async function newOutputDetails(req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    const newOutputDetails: OutputDetail[] = req.body.outputDetails;

    let outputDetailIds: number[] = [];
    let well: boolean = false;
    let resp: any = {};
    newOutputDetails.forEach(async (newOutputDetail) => {
        resp = await conn.query(`INSERT INTO detalle_venta (venta_id, costo_unitario, precio_unitario, cantidad, producto_id) values (?, ?, ?, ?, ?);`, [newOutputDetail.venta_id, newOutputDetail.costo_unitario, newOutputDetail.precio_unitario, newOutputDetail.cantidad, newOutputDetail.producto_id]).then((resp: any) => resp[0])
        // if (resp.affectedRows || resp.insertId) {
        //     console.log('ewll is true');
        //     well = true;
        //     outputDetailIds.push(resp.insertId);
        // } else {
        //     console.log('well is false');
        //     well = false;
        // }
    });
    return res.json({ message: 'success' });
    // console.log('well es', well);
    // if (well) {
    //     return res.json({
    //         message: 'success',
    //         outputDetailId: outputDetailIds
    //     });
    // } else {
    //     return res.json({
    //         message: 'error',
    //     });
    // }
}

export async function updateOutputDetail(req: Request, res: Response): Promise<Response> {
    const outputDetailId: number = parseInt(req.params.outputDetailId);
    const outputDetailUpdated: OutputDetail = req.body;
    const resp: MySQLUpdateResponse = await updateRow('detalle_venta', 'detalle_venta_id', outputDetailId, outputDetailId);
    if (resp.changedRows) {
        return res.json({
            message: 'Output Detail Changed'
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

export async function deleteOutputDetail(req: Request, res: Response): Promise<Response> {
    const outputDetailId: number = parseInt(req.params.outputDetailId);
    const resp: MySQLDeletedResponse = await deleteRow('detalle_venta', 'detalle_venta_id', outputDetailId);
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