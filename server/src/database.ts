import { createPool } from 'mysql2/promise';

export async function connect() {
    const connection = await createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password:  process.env.DB_PASSWORD || 'cS!73EKXx22',
        database: 'punto_de_venta' ,
        connectionLimit: 10
    });
    return connection;
}