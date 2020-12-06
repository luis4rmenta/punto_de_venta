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
exports.deleteInput = exports.newInput = exports.updateInput = exports.getInput = exports.getInputs = void 0;
const database_1 = require("../database");
const mysql_controller_1 = require("./mysql.controller");
function getInputs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resp = yield mysql_controller_1.getTable('entrada');
            return res.json(resp);
        }
        catch (error) {
            console.error(error);
            return res.json({ message: 'Error' });
        }
    });
}
exports.getInputs = getInputs;
function getInput(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputId = parseInt(req.params.inputId);
        try {
            const resp = yield mysql_controller_1.getRow('entrada', 'entrada_id', inputId).then((resp) => resp[0]);
            return res.json(resp);
        }
        catch (error) {
            console.error(error);
            return res.json({ message: 'Error' });
        }
    });
}
exports.getInput = getInput;
function updateInput(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const inputId = parseInt(req.params.inputId);
            const inputUpdated = req.body;
            const resp = yield mysql_controller_1.updateRow('entrada', 'entrada_id', inputId, inputUpdated).then((resp) => resp[0]);
            if (resp.changedRows && resp.affectedRows) {
                return res.json({ message: 'Input updated' });
            }
            else {
                return res.json({ message: 'Error' });
            }
        }
        catch (error) {
            return res.json({ message: 'Error' });
        }
    });
}
exports.updateInput = updateInput;
function newInput(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const conn = yield database_1.connect();
            const newInput = req.body;
            const resp = yield conn.query(`
        INSERT 
        INTO 
            (fecha, total, estado_id, empleado_id, proveedor_id) 
        VALUES (?, ?, ?, ?, ?, ?);`, [newInput.fecha, newInput.total, newInput.estado_id,
                newInput.empleado_id, newInput.proveedor_id]).then((resp) => resp[0]);
            if (resp.warningStatus) {
                return res.json({ message: 'Error' });
            }
            else {
                return res.json({
                    message: 'input created',
                    inputId: resp.insertId
                });
            }
        }
        catch (error) {
            console.error(error);
            return res.json({ message: 'Error' });
        }
    });
}
exports.newInput = newInput;
function deleteInput(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const inputId = parseInt(req.params.inputId);
            const resp = yield mysql_controller_1.deleteRow('entrada', 'entrada_id', inputId);
            if (resp.affectedRows) {
                return res.json({ message: 'input deleted' });
            }
            if (resp.warningStatus) {
                return res.json({ message: 'error' });
            }
        }
        catch (error) {
            console.error(error);
            return res.json({ message: 'error' });
        }
    });
}
exports.deleteInput = deleteInput;
// export async function addInput(req: Request, res:Response): Promise<Response> {
//     const datetime = getDateTime();
//     const data: {
//         empleado_id: number,
//         estado_id?: 1,
//         fecha?: string,
//         proveedor_id: number,
//         products: [{product: Product, cantidad: number}]
//     } = req.body;
//     let total: number = 0;
//     let inputDetails: InputDetail[] = [];
//     for (const product in data.products) {
//         if (Object.prototype.hasOwnProperty.call(data.products, product)) {
//             const element = data.products[product];
//             if (element.product.producto_id) {
//                 inputDetails.push({
//                     cantidad: element.cantidad,
//                     costo_unitario: element.product.costo,
//                     producto_id:  element.product.producto_id
//                 });
//                 total = total + (element.product.costo * element.cantidad);
//             } else {
//                 inputDetails.push({
//                     cantidad: element.cantidad,
//                     costo_unitario: element.product.costo,
//                     producto_id:  0
//                 });
//                 total = total + (element.product.costo * element.cantidad);
//             }
//         }
//     }
//     let input: Input = {
//         empleado_id: 1,
//         estado_id : 1,
//         fecha : '',
//         proveedor_id : 1,
//         total : 1,
//         entrada_id : 1
//     }
//     if (data.estado_id) {
//         input = {
//             empleado_id: data.empleado_id,
//             estado_id: data.estado_id,
//             fecha: datetime,
//             proveedor_id: data.proveedor_id,
//             total: total
//         };
//     } else {
//         input = {
//             empleado_id: data.empleado_id,
//             estado_id: 1,
//             fecha: datetime,
//             proveedor_id: data.proveedor_id,
//             total: total
//         };
//     }
//     const conn = await connect();
//     await newInput(input);
//     const entrada_id = await getIdOfInputbyDate(datetime);
//     for (const inputDetail of inputDetails) {
//         inputDetail.entrada_id = entrada_id;
//         await addInputDetail(inputDetail);
//         await updateStock(inputDetail);
//     }
//     return res.json({
//         message: 'Input created'
//     });
// }
// export async function getInputById(req: Request, res: Response): Promise<Response> {
//     const inputId = req.params.inputId;
//     // let input: Input[] = await getInput(inputId);
//     const input = await getRow('entrada', 'entrada_id', inputId);
//     return res.json(input);
// }
// export async function getInputs(req: Request, res: Response): Promise<Response> {
//     const resp = await getTable('entrada');
//     console.log(resp);
// }
// export async function updateInput(req: Request, res: Response): Promise<Response> {
//     const inputUpdated: Input = req.body;
//     const inputId = req.body.entrada_id;
//     const updatedInput = await putUpdateInput(inputUpdated, inputId);
//     if (updatedInput) {
//         return res.json({
//             message: 'Input Updated'
//         });
//     } else {
//         return res.json({
//             message: 'input not updated'
//         })
//     }
// }
// export async function deleteInput(req: Request, res: Response): Promise<Response> {
//     const inputId: number = parseInt(req.params.inputId);
//     const inputDeteled: boolean = await deleteInputById(inputId);
//     if (inputDeteled) {
//         return res.json({
//             message: 'input deleted'
//         });
//     } else {
//         return res.json({
//             message: 'error'
//         });
//     }
// }
// function getDateTime(): string {
//     const dt = new Date();
//     return `${dt.getFullYear().toString().padStart(4, '0')}-${
//             (dt.getMonth()+1).toString().padStart(2, '0')}-${
//             dt.getDate().toString().padStart(2, '0')} ${
//             dt.getHours().toString().padStart(2, '0')}:${
//             dt.getMinutes().toString().padStart(2, '0')}:${
//             dt.getSeconds().toString().padStart(2, '0')}`;
// }
// async function newInput(input: Input): Promise<boolean> {
//     const conn = await connect();
//     return conn.query(`INSERT INTO entrada (fecha, total, estado_id, empleado_id, proveedor_id)
//     VALUES (?, ?, ?, ?, ?);`, [
//         input.fecha, 
//         input.total, 
//         input.estado_id, 
//         input.empleado_id, 
//         input.proveedor_id
//     ]).then(resp => true).catch(resp => false);
// }
// async function getIdOfInputbyDate(datetime: string): Promise<number> {
//     const conn = await connect();
//     return conn.query(`SELECT entrada_id from entrada where fecha = ?`, [datetime]).then((resp: any) => parseInt(resp[0][0].entrada_id)).catch(err => 0);
// }
// async function addInputDetail(inputDetail: InputDetail): Promise<boolean> {
//     const conn = await connect();
//     return conn.query(`INSERT INTO detalle_entrada (entrada_id, costo_unitario, cantidad, producto_id)
//                     VALUES (?, ?, ?, ?);`, [
//                         inputDetail.entrada_id,
//                         inputDetail.costo_unitario,
//                         inputDetail.cantidad,
//                         inputDetail.producto_id
//                     ]).then(resp => true).catch(resp => false);
// }
// async function updateStock(inputDetail:InputDetail): Promise<boolean> {
//     const conn = await connect();
//     return conn.query(`UPDATE producto set stock = stock+? WHERE producto_id = ?`, [inputDetail.cantidad, inputDetail.producto_id]).then(resp => true).catch(resp => false);
// }
// async function getProvider(providerId: number): Promise<Provider> {
//     const conn = await connect();
//     return conn.query(`SELECT * FROM proveedor WHERE proveedor_id = ?;`, [providerId]).then((resp: any) => resp[0][0]);
// }
// async function getInput(inputId: String): Promise<Input[]>{
//     const conn = await connect();
//     return await conn.query(`SELECT * FROM entrada WHERE entrada_id = ?;`, [inputId]).then((resp: any) => resp[0]).then((resp: Input[]) => resp);
// }
// async function getInputDetails(inputId:string): Promise<InputDetail[]> {
//     const conn = await connect();
//     return await conn.query(`SELECT * FROM detalle_entrada where entrada_id = ?;`, [inputId]).then((resp: any) => resp[0]).then((resp: InputDetail[]) => resp);
// }
// async function getEmployee(employeeId: number): Promise<Employee> {
//     const conn = await connect();
//     return await conn.query(`SELECT 
//                     e.empleado_id, 
//                     p.curp,
//                     p.nombre, 
//                     p.primer_apellido, 
//                     p.fecha_de_nacimiento, 
//                     p.genero, p.telefono, 
//                     p.email, 
//                     p.direccion,
//                     e.fecha as 'Empleado desde',
//                     te.tipo_de_empleado
//                 FROM
//                     persona as p
//                 inner join
//                     empleado as e
//                     on p.person_id = e.persona_id
//                 inner join
//                     tipo_empleado as te
//                     on e.tipo_empleado_id = te.tipo_empleado_id
//                 WHERE e.empleado_id = ?;`, [employeeId]).then((resp: any) => resp[0][0]);
// }
// async function getProduct(productId: number) {
//     const conn = await connect();
//     return await conn.query(`SELECT * FROM producto where producto_id = ?;`, [productId]);
// }
// async function putUpdateInput(inputUpdated: Input, where: number) {
//     const conn = await connect();
//     const resp: MySQLUpdateResponse[] = await conn.query(`UPDATE entrada set ? where entrada_id = ?`, [inputUpdated, where]).then((resp: any) => resp);
//     console.log(resp);
//     if (resp[0].changedRows > 0) {
//         return true;
//     } else {
//         return false;
//     }
// }
// async function deleteInputById(inputId: number): Promise<boolean> {
//     const conn = await connect();
//     const resp: MySQLDeletedResponse = await conn.query(`DELETE FROM entrada WHERE entrada_id = ?;`, [inputId]).then((resp:any) => resp);
//     if (resp.affectedRows) {
//         return true;
//     } if (!resp.affectedRows && !resp.warningStatus) {
//         return true;
//     } else {
//         return false;
//     }
// }
