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
exports.isAdmin = void 0;
const mysql_controller_1 = require("../controllers/mysql.controller");
function isAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { empleado_id } = yield mysql_controller_1.getRow('usuario', 'usuario_id', req.userId).then((resp) => resp[0]);
        const { tipo_empleado_id } = yield mysql_controller_1.getRow('empleado', 'empleado_id', empleado_id).then((resp) => resp[0]);
        if (tipo_empleado_id === 1) {
            next();
        }
        else {
            return res.status(401).json({
                message: 'Access denied'
            });
        }
    });
}
exports.isAdmin = isAdmin;
