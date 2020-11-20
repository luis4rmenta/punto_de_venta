import { Request, Response } from 'express';

import { connect } from '../database';
import { Product } from '../interfaces/product.interface';

export async function getProducts(req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    const products = await conn.query('SELECT * FROM producto;');
    return res.json(products[0]);
}

export async function getProduct(req: Request, res: Response): Promise<Response> {
    const id = req.params.productId;
    const conn = await connect();
    const product = await conn.query('select * from producto WHERE producto_id = ?', [id]);
    return res.json(product[0]);
}

export async function newProduct(req: Request, res: Response): Promise<Response> {
    const product: Product = req.body;
    const conn = await connect();
    await conn.query(
        `insert into producto (
                                nombre, 
                                codigo_de_barras,
                                estado_id, 
                                fecha_de_creación, 
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
        ]);
    return res.json({
        message: 'Product added'
    });
}

export async function updateProduct(req: Request, res: Response): Promise<Response> {
    const id = req.params.productId;
    const updatedProduct: Product = req.body;
    const conn = await connect();
    await conn.query(`UPDATE producto set ? where producto_id = ?`, [updatedProduct, id]);
    return res.json({
        message: "product updated"
    });
}

export async function deleteProduct(req: Request, res: Response): Promise<Response> {
    const id = req.params.productId;
    const conn = await connect();
    await conn.query('DELETE FROM producto where = ?',[id]);
    return res.json({
        message: "Product deleted"
    });
}

export async function findProductByCodebar(req: Request, res:Response): Promise<Response> {
    const codebar = req.params.codebar;
    const conn = await connect();
    const product = await conn.query(`select * from producto where codigo_de_barras = ?`, [codebar]);
    return res.json(product[0]);
}
