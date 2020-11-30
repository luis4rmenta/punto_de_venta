import { connect } from '../database';
import { MySQLDeletedResponse } from '../interfaces/mySQLDeletedResponse.interface';
import { MySQLUpdateResponse } from '../interfaces/mySQLUpdatedResponse.interface';

const conn = connect();



export async function getTable(tableName: string): Promise<any[]> {
    try {
        return (await conn).query(`SELECT * FROM ${tableName};`).then((resp: any) => resp[0]);
    } catch (error) {
        console.error(error);
        return []
    }
    
}

export async function getRow(tableName:string, where: string, value: string | number) {
    try {
        return (await conn).query(`SELECT * FROM ${tableName} WHERE ${where} =?;`,[value]).then((resp: any) => resp[0])   
    } catch (error) {
        console.error(error);
        
        return;
    }
}

export async function getRows(tableName:string, where: string, value: string | number) {
    try {
        return (await conn).query(`SELECT * FROM ${tableName} WHERE ${where}=?;`, [value]).then((resp: any) => resp[0]);
    } catch (error) {
        console.error(error);
        return;
    }
}

export async function updateRow(tableName: string, where: string, whereValue: string | number, updatedField: any): Promise<MySQLUpdateResponse> {
    try {
        return (await conn).query(`UPDATE ${tableName} SET ? WHERE ${where} = ?;`, [updatedField, whereValue]).then((resp: any) => resp)
    } catch (error) {
        console.error(error);
        const resp: MySQLUpdateResponse = {
            affectedRows: 0,
            changedRows: 0,
            fieldCount: 0,
            info: '',
            insertId: 0,
            serverStatus: 1,
            warningStatus: 1
        }
        return resp
    }
}

export async function deleteRow(tableName: string, where: string, whereValue: string | number): Promise<MySQLDeletedResponse> {
    try {
        return (await conn).query(`DELETE FROM ${tableName} WHERE ${where} = ${whereValue};`).then((resp: any) => resp[0]);
    } catch (error) {
        const resp: MySQLDeletedResponse = {
            affectedRows: 0,
            fieldCount: 0,
            info: '',
            insertId: 0,
            serverStatus: 1,
            warningStatus: 1
        }
        return resp;
    }
}
