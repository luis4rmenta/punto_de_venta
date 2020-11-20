import { createPool } from 'mysql2/promise';

export async function connect() {
    const connection = await createPool({
        host: 'localhost',
        user: 'root',
        password: 'cS!73EKXx22',
        database: 'punto_de_venta',
        connectionLimit: 10
    });
    return connection;
}