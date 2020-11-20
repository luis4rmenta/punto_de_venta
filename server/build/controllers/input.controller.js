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
exports.deleteInput = exports.updateInput = exports.getInputById = exports.addInput = void 0;
const database_1 = require("../database");
function addInput(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const datetime = getDateTime();
        const data = req.body;
        let total = 0;
        let inputDetails = [];
        for (const product in data.products) {
            if (Object.prototype.hasOwnProperty.call(data.products, product)) {
                const element = data.products[product];
                if (element.product.producto_id) {
                    inputDetails.push({
                        cantidad: element.cantidad,
                        costo_unitario: element.product.costo,
                        producto_id: element.product.producto_id
                    });
                    total = total + (element.product.costo * element.cantidad);
                }
                else {
                    inputDetails.push({
                        cantidad: element.cantidad,
                        costo_unitario: element.product.costo,
                        producto_id: 0
                    });
                    total = total + (element.product.costo * element.cantidad);
                }
            }
        }
        let input = {
            empleado_id: 1,
            estado_id: 1,
            fecha: '',
            proveedor_id: 1,
            total: 1,
            entrada_id: 1
        };
        if (data.estado_id) {
            input = {
                empleado_id: data.empleado_id,
                estado_id: data.estado_id,
                fecha: datetime,
                proveedor_id: data.proveedor_id,
                total: total
            };
        }
        else {
            input = {
                empleado_id: data.empleado_id,
                estado_id: 1,
                fecha: datetime,
                proveedor_id: data.proveedor_id,
                total: total
            };
        }
        const conn = yield database_1.connect();
        yield newInput(input);
        const entrada_id = yield getIdOfInputbyDate(datetime);
        for (const inputDetail of inputDetails) {
            inputDetail.entrada_id = entrada_id;
            yield addInputDetail(inputDetail);
            yield updateStock(inputDetail);
        }
        return res.json({
            message: 'Input created'
        });
    });
}
exports.addInput = addInput;
function getInputById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputId = req.params.inputId;
        const conn = yield database_1.connect();
        const inputRes = yield getInput(inputId);
        if (inputRes.length) {
            const input = inputRes[0];
            const provider = yield getProvider(input.proveedor_id);
            const employee = yield getEmployee(input.empleado_id);
            const inputDetails = yield getInputDetails(inputId);
            return res.json({
                inputData: input,
                providerData: provider,
                employeeData: employee,
                inputDetails: Object.assign({}, inputDetails)
            });
        }
        else {
            return res.json({
                message: 'error'
            });
        }
    });
}
exports.getInputById = getInputById;
function updateInput(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputUpdated = req.body;
        const inputId = req.body.entrada_id;
        const updatedInput = yield putUpdateInput(inputUpdated, inputId);
        if (updatedInput) {
            return res.json({
                message: 'Input Updated'
            });
        }
        else {
            return res.json({
                message: 'input not updated'
            });
        }
    });
}
exports.updateInput = updateInput;
function deleteInput(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputId = parseInt(req.params.inputId);
        const inputDeteled = yield deleteInputById(inputId);
        if (inputDeteled) {
            return res.json({
                message: 'input deleted'
            });
        }
        else {
            return res.json({
                message: 'error'
            });
        }
    });
}
exports.deleteInput = deleteInput;
function getDateTime() {
    const dt = new Date();
    return `${dt.getFullYear().toString().padStart(4, '0')}-${(dt.getMonth() + 1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')} ${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`;
}
function newInput(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        return conn.query(`INSERT INTO entrada (fecha, total, estado_id, empleado_id, proveedor_id)
    VALUES (?, ?, ?, ?, ?);`, [
            input.fecha,
            input.total,
            input.estado_id,
            input.empleado_id,
            input.proveedor_id
        ]).then(resp => true).catch(resp => false);
    });
}
function getIdOfInputbyDate(datetime) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        return conn.query(`SELECT entrada_id from entrada where fecha = ?`, [datetime]).then((resp) => parseInt(resp[0][0].entrada_id)).catch(err => 0);
    });
}
function addInputDetail(inputDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        return conn.query(`INSERT INTO detalle_entrada (entrada_id, costo_unitario, cantidad, producto_id)
                    VALUES (?, ?, ?, ?);`, [
            inputDetail.entrada_id,
            inputDetail.costo_unitario,
            inputDetail.cantidad,
            inputDetail.producto_id
        ]).then(resp => true).catch(resp => false);
    });
}
function updateStock(inputDetail) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        return conn.query(`UPDATE producto set stock = stock+? WHERE producto_id = ?`, [inputDetail.cantidad, inputDetail.producto_id]).then(resp => true).catch(resp => false);
    });
}
function getProvider(providerId) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        return conn.query(`SELECT * FROM proveedor WHERE proveedor_id = ?;`, [providerId]).then((resp) => resp[0][0]);
    });
}
function getInput(inputId) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        return yield conn.query(`SELECT * FROM entrada WHERE entrada_id = ?;`, [inputId]).then((resp) => resp[0]).then((resp) => resp);
    });
}
function getInputDetails(inputId) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        return yield conn.query(`SELECT * FROM detalle_entrada where entrada_id = ?;`, [inputId]).then((resp) => resp[0]).then((resp) => resp);
    });
}
function getEmployee(employeeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        return yield conn.query(`SELECT 
                    e.empleado_id, 
                    p.curp,
                    p.nombre, 
                    p.primer_apellido, 
                    p.fecha_de_nacimiento, 
                    p.genero, p.telefono, 
                    p.email, 
                    p.direccion,
                    e.fecha as 'Empleado desde',
                    te.tipo_de_empleado
                FROM
                    persona as p
                inner join
                    empleado as e
                    on p.person_id = e.persona_id
                inner join
                    tipo_empleado as te
                    on e.tipo_empleado_id = te.tipo_empleado_id
                WHERE e.empleado_id = ?;`, [employeeId]).then((resp) => resp[0][0]);
    });
}
function getProduct(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        return yield conn.query(`SELECT * FROM producto where producto_id = ?;`, [productId]);
    });
}
function putUpdateInput(inputUpdated, where) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        const resp = yield conn.query(`UPDATE entrada set ? where entrada_id = ?`, [inputUpdated, where]).then((resp) => resp);
        console.log(resp);
        if (resp[0].changedRows > 0) {
            return true;
        }
        else {
            return false;
        }
    });
}
function deleteInputById(inputId) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect();
        const resp = yield conn.query(`DELETE FROM entrada WHERE entrada_id = ?;`, [inputId]).then((resp) => resp);
        if (resp.affectedRows) {
            return true;
        }
        if (!resp.affectedRows && !resp.warningStatus) {
            return true;
        }
        else {
            return false;
        }
    });
}
