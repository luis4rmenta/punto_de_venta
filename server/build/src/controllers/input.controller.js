"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = exports.addInput = void 0;
function addInput(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const dt = new Date();
        // const datetime = `${
        //     (dt.getMonth()+1).toString().padStart(2, '0')}/${
        //     dt.getDate().toString().padStart(2, '0')}/${
        //     dt.getFullYear().toString().padStart(4, '0')} ${
        //     dt.getHours().toString().padStart(2, '0')}:${
        //     dt.getMinutes().toString().padStart(2, '0')}:${
        //     dt.getSeconds().toString().padStart(2, '0')}`;
        // const data: {
        //     empleado_id: number,
        //     estado_id?: 1,
        //     fecha?: string,
        //     proveedor_id: number,
        //     products: [{product: Product, cantidad: number}]
        // } = req.body;
        // console.log(data);
        // let total: number = 0;
        // let inputDetails: InputDetail[] = [];
        // for (const product in data.products) {
        //     if (Object.prototype.hasOwnProperty.call(data.products, product)) {
        //         const element = data.products[product];
        //         if (element.product.producto_id) {
        //             inputDetails.push({
        //                 cantidad: element.cantidad,
        //                 costo_unitario: element.product.costo,
        //                 producto_id:  element.product.producto_id
        //             });
        //         } else {
        //             inputDetails.push({
        //                 cantidad: element.cantidad,
        //                 costo_unitario: element.product.costo,
        //                 producto_id:  0
        //             });
        //         }
        //     }
        // }
        // let input: Input = {
        //     empleado_id: 1,
        //     estado_id : 1,
        //     fecha : '',
        //     proveedor_id : 1,
        //     total : 1,
        //     entrada_id : 1
        // }
        // if (data.estado_id) {
        //     input = {
        //         empleado_id: data.empleado_id,
        //         estado_id: data.estado_id,
        //         fecha: datetime,
        //         proveedor_id: data.proveedor_id,
        //         total: total
        //     };
        // } else {
        //     input = {
        //         empleado_id: data.empleado_id,
        //         estado_id: 1,
        //         fecha: datetime,
        //         proveedor_id: data.proveedor_id,
        //         total: total
        //     };
        // }
        // const conn = await connect();
        // await conn.query(`INSERT INTO entrada (fecha, total, estado_id, empleado_id, proveedor_id)
        //             VALUES (?, ?, ?, ?, ?);`, [
        //                 input.fecha, 
        //                 input.total, 
        //                 input.estado_id, 
        //                 input.empleado_id, 
        //                 input.proveedor_id
        //             ]);
        // for (const inputDetail of inputDetails) {
        //     const entrada_id = await conn.query(`SELECT entrada_id from entrada where fecha = ?`, [datetime]);
        //     await conn.query(`INSERT INTO detalle_entrada (entrada_id, costo_unitario, cantidad, producto_id)
        //                 VALUES (?, ?, ?, ?);`, [
        //                     inputDetail.entrada_id,
        //                     inputDetail.costo_unitario,
        //                     inputDetail.cantidad,
        //                     entrada_id
        //                 ]);
        //     await conn.query(`UPDATE producto set stock = stock+? WHERE producto_id = ?`, [inputDetail.cantidad, inputDetail.producto_id]);
        // }
        // return res.json({
        //     message: 'Input created'
        // });
        return res.json({
            "message": 'all right'
        });
    });
}
exports.addInput = addInput;
function hello(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.send('all right');
    });
}
exports.hello = hello;
;
