export interface FullInput {
    entrada_id: number,
    proveedor_id: number,
    proveedor: string,
    organizacion_proveedor: string,
    fecha_de_compra: string,
    receptor_id: number,
    receptor: string,
    total: number,
    products: [{
        product: {
        producto_id: number,
        nombre: string,
        codigo_de_barras: string,
        costo_unitario: number,
        detalle_compra: number
        }, cantidad: number
    }]
}