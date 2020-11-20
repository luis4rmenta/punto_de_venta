export interface Product {
    producto_id?: number,
    nombre: string,
    codigo_de_barras: string,
    estado_id: number,
    fecha_de_creacion: string,
    costo: number,
    precio: number,
    stock: number,
    categoria_id: number
}