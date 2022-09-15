import mysql from 'mysql2/promise';
import { createPool } from 'mysql2/typings/mysql';

export class DataBaseConnection {
  private static instance: DataBaseConnection;
  private connection: Promise<mysql.Connection>;

  private constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password:  process.env.DB_PASSWORD || 'secret',
      database: 'punto_de_venta' ,
      connectionLimit: 10
    });
  }

  public static getInstance() {
    if (this.instance == null) {
      this.instance = new DataBaseConnection();
    }

    return this.instance;
  }

  public getConnection(): Promise<mysql.Connection> {
    return this.connection;
  }
}