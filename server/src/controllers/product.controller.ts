import { Request, Response } from 'express';

import { connect, DataBaseConnection } from '../database';
import { MySQLInsertResponse } from '../interfaces/mySQLInsertResponse.interface';
import { Product } from '../interfaces/product.interface';

export async function getProducts(req: Request, res: Response): Promise<Response> {
    const conn  =  await DataBaseConnection.getInstance().getConnection()
    const products = await conn.query('SELECT * FROM producto;');
    return res.json(products[0]);
}

export async function getProduct(req: Request, res: Response): Promise<Response> {
    const id = req.params.productId;
    const conn  =  await DataBaseConnection.getInstance().getConnection()
    const product = await conn.query('select * from producto WHERE producto_id = ?', [id]).then((resp: any) => resp[0]);
    return res.json(product[0]);
}

export async function newProduct(req: Request, res: Response): Promise<Response> {
    const product: Product = req.body;
    const conn  =  await DataBaseConnection.getInstance().getConnection()
    const resp: MySQLInsertResponse = await conn.query(
        `insert into producto (
                                nombre, 
                                codigo_de_barras,
                                estado_id, 
                                fecha_de_creacion, 
                                costo, 
                                precio, 
                                stock, 
                                categoria_id
                              ) 
        values (?, ?, ?, ?, ?, ?, ?, ?);`, [
            product.nombre,
            product.codigo_de_barras,
            product.estado_id,
            product.fecha_de_creacion,
            product.costo,
            product.precio,
            product.stock,
            product.categoria_id
        ]).then((resp: any) => resp[0]);
    return res.json({
        message: 'Product added',
        productId: resp.insertId
    });
}

export async function updateProduct(req: Request, res: Response): Promise<Response> {
    const id = req.params.productId;
    const updatedProduct: Product = req.body;
    const conn  =  await DataBaseConnection.getInstance().getConnection()
    await conn.query(`UPDATE producto set ? where producto_id = ?`, [updatedProduct, id]);
    return res.json({
        message: "product updated"
    });
}

export async function deleteProduct(req: Request, res: Response): Promise<Response> {
    const id = req.params.productId;
    const conn  =  await DataBaseConnection.getInstance().getConnection()
    await conn.query('DELETE FROM producto where producto_id = ?',[id]);
    return res.json({
        message: "Product deleted"
    });
}

export async function findProductByCodebar(req: Request, res:Response): Promise<Response> {
    const codebar = req.params.codebar;
    const conn  =  await DataBaseConnection.getInstance().getConnection()
    const product = await conn.query(`select * from producto where codigo_de_barras = ?`, [codebar]).then((res: any) => res[0][0]);
    return res.json(product);
}

export async function findProductByName(req: Request, res: Response): Promise<Response> {
    const name = req.params.productName;
    const conn  =  await DataBaseConnection.getInstance().getConnection()
    const products = await conn.query(`
    SELECT * FROM producto WHERE nombre LIKE "%${name}%";`,).then();
    return res.json(products[0]);
}
