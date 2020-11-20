import { connect } from '../database';
import { MySQLDeletedResponse } from '../interfaces/mySQLDeletedResponse.interface';
import { MySQLUpdateResponse } from '../interfaces/mySQLUpdatedResponse.interface';

export async function getTable(tableName: string): Promise<any[]> {
    const conn = await connect();
    return await conn.query(`SELECT * FROM ${tableName};`).then((resp: any) => resp[0]);
}

export async function getRow(tableName:string, where: string, value: string | number) {
    const conn = await connect();
    return await conn.query(`SELECT * FROM ${tableName} WHERE ${where} = ${value};`).then((resp: any) => resp[0])
}

export async function updateRow(tableName: string, where: string, whereValue: string | number, updatedField: any): Promise<MySQLUpdateResponse> {
    const conn = await connect();
    console.log(`UPDATE ${tableName} SET ${updatedField} WHERE ${where} = ${whereValue};`);
    return await conn.query(`UPDATE ${tableName} SET ? WHERE ${where} = ?;`, [updatedField, whereValue]).then((resp: any) => resp)
}

export async function deleteRow(tableName: string, where: string, whereValue: string | number): Promise<MySQLDeletedResponse> {
    const conn = await connect();
    return await conn.query(`DELETE FROM ${tableName} WHERE ${where} = ${whereValue};`).then((resp: any) => resp[0]);
}
