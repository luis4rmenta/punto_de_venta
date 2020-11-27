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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserType = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mysql_controller_1 = require("./mysql.controller");
const database_1 = require("../database");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        //Obtengo el nuevo empleado enviado
        const newUser = {
            empleado_id: req.body.employeeId,
            usuario: req.body.user,
            password: bcryptjs_1.default.hashSync(req.body.password)
        };
        //busco en la base de datos si la existe el usuario
        const userExists = yield mysql_controller_1.getRows('usuario', 'username', newUser.usuario).then((resp) => !!resp.length);
        //busco en la base de datos si ya existe un empleado con una cuenta
        const employeeAccountExists = yield mysql_controller_1.getRows('usuario', 'empleado_id', newUser.empleado_id).then((resp) => !!resp.length);
        if (userExists) {
            return res.json({ message: 'user already exists' });
        }
        if (employeeAccountExists) {
            return res.json({ message: 'user account already exists' });
        }
        else {
            const conn = yield database_1.connect();
            const resp = yield conn.query('INSERT INTO usuario (empleado_id, username, password) values (?,?,?);', [newUser.empleado_id, newUser.usuario, newUser.password]).then((resp) => resp[0]);
            if (resp.affectedRows && !resp.warningStatus) {
                //Obteniendo información del usuario
                newUser.usuario_id = resp.insertId;
                const user = newUser;
                const employeeData = yield mysql_controller_1.getRow('empleado', 'empleado_id', user.empleado_id).then(resp => resp[0]);
                const personData = yield mysql_controller_1.getRow('persona', 'person_id', employeeData.persona_id).then(resp => resp[0]);
                //Generando Token
                const expiresIn = 8 * 60 * 60;
                const accessToken = jsonwebtoken_1.default.sign({ id: user.usuario_id }, process.env.SECRETKEY || 'secret', {
                    expiresIn: expiresIn
                });
                return yield res.json({
                    data: {
                        user: {
                            usuario_id: user.usuario_id,
                            username: user.usuario
                        },
                        employee: {
                            empleado_id: employeeData.empleado_id,
                            tipo_de_empleado: employeeData.tipo_de_empleado,
                            fecha: employeeData.fecha
                        },
                        person: Object.assign({}, personData),
                        accessData: {
                            accessToken,
                            expiresIn
                        }
                    }
                });
            }
            else {
                res.json({ message: "shomething is wrong!" });
            }
            console.log(resp);
            console.log();
        }
    });
}
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //Obteniendo información de login
        const login = {
            usuario: req.body.user,
            password: req.body.password
        };
        //Buscando usuario en la base de datos
        let user = yield mysql_controller_1.getRow('usuario', 'username', login.usuario).then(resp => resp[0]);
        ;
        if (user) {
            //Comparando contraseñas
            const resultPassword = bcryptjs_1.default.compareSync(login.password, user.password);
            if (resultPassword) {
                //Obteniendo información del usuario
                const employeeData = yield mysql_controller_1.getRow('empleado', 'empleado_id', user.empleado_id).then(resp => resp[0]);
                const personData = yield mysql_controller_1.getRow('persona', 'person_id', employeeData.persona_id).then(resp => resp[0]);
                //Generando Token
                const expiresIn = 8 * 60 * 60;
                const accessToken = jsonwebtoken_1.default.sign({ id: user.usuario_id }, process.env.SECRETKEY || 'secret', {
                    expiresIn: expiresIn
                });
                return yield res.json({
                    data: {
                        user: {
                            usuario_id: user.usuario_id,
                            username: user.username
                        },
                        employee: {
                            empleado_id: employeeData.empleado_id,
                            tipo_de_empleado: employeeData.tipo_de_empleado,
                            fecha: employeeData.fecha
                        },
                        person: Object.assign({}, personData),
                        accessData: {
                            accessToken,
                            expiresIn
                        }
                    }
                });
            }
            else {
                res.json({ message: 'wrong password' });
            }
        }
        else {
            res.status(401).json({ message: 'user not found' });
        }
    });
}
exports.login = login;
function getUserType(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.userId);
        console.log('entry');
        const conn = yield database_1.connect();
        const userType = yield conn.query(`
        SELECT empleado.tipo_empleado_id FROM usuario 
        INNER JOIN empleado 
            ON usuario.empleado_id = empleado.empleado_id 
            WHERE usuario.usuario_id = ?;
    `, [req.userId]).then((resp) => resp[0][0]);
        console.log(userType.tipo_empleado_id);
        if (userType.tipo_empleado_id) {
            switch (userType.tipo_empleado_id) {
                case 1: return res.json({ roll: 'admin' });
                case 2: return res.json({ roll: 'moderator' });
                case 3: return res.json({ roll: 'employee' });
                default: return res.status(401).json({ roll: 'error' });
            }
        }
    });
}
exports.getUserType = getUserType;
