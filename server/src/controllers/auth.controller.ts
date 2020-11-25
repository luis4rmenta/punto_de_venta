import { Request, Response } from 'express';
import { RegisterForm } from '../interfaces/registerForm.interface';
import bcrypt from 'bcryptjs';
import { getRow, getRows } from './mysql.controller';
import { connect } from '../database';
import { UserI } from '../interfaces/user.interface';
import { MySQLInsertResponse } from '../interfaces/mySQLInsertResponse.interface';
import { Employee } from '../interfaces/employee.interface';
import { Person } from '../interfaces/person.interface';
import jwt from 'jsonwebtoken';

export async function register(req: Request, res: Response) {
    console.log(req.body);
    //Obtengo el nuevo empleado enviado
    const newUser: RegisterForm = {
        empleado_id: req.body.employeeId,
        usuario: req.body.user,
        password: bcrypt.hashSync(req.body.password)
    }

    //busco en la base de datos si la existe el usuario
    const userExists: boolean = await getRows('usuario', 'username', newUser.usuario).then((resp: UserI[]) => !!resp.length);
    //busco en la base de datos si ya existe un empleado con una cuenta
    const employeeAccountExists: boolean = await getRows('usuario', 'empleado_id', newUser.empleado_id).then((resp: UserI[]) => !!resp.length);
    if (userExists) {
        return res.json({message: 'user already exists'});
    } if (employeeAccountExists) {
        return res.json({message: 'user account already exists'});
    } else {
        const conn = await connect();
        const resp: MySQLInsertResponse = await conn.query('INSERT INTO usuario (empleado_id, username, password) values (?,?,?);', [newUser.empleado_id, newUser.usuario, newUser.password]).then((resp: any) => resp[0]);
        if (resp.affectedRows && !resp.warningStatus) {
            //Obteniendo información del usuario
            newUser.usuario_id = resp.insertId;
            const user = newUser;
            const employeeData: any = await getRow('empleado', 'empleado_id', user.empleado_id).then(resp => resp[0]);
            const personData: Person = await getRow('persona', 'person_id', employeeData.persona_id).then(resp => resp[0]);
            //Generando Token
            const expiresIn: number = 8*60*60;
            const accessToken = jwt.sign({id: user.usuario_id}, process.env.SECRETKEY || 'secret', {
                expiresIn: expiresIn
            });

            return await res.json({
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
                    person: {
                        ...personData
                    },
                    accessData: {
                        accessToken,
                        expiresIn
                    }
                }
            })
        } else {
            res.json({message: "shomething is wrong!"});
        }
        console.log(resp);
        console.log();
    }

}

export async function login(req: Request, res: Response) {
    //Obteniendo información de login
    const login = {
        usuario: req.body.user,
        password: req.body.password
    }

    //Buscando usuario en la base de datos
    let user: UserI = await getRow('usuario', 'username', login.usuario).then(resp => resp[0]);;
    if (user) {
        //Comparando contraseñas
        const resultPassword: boolean = bcrypt.compareSync(login.password, user.password);
        
        if (resultPassword) {
            //Obteniendo información del usuario
            const employeeData: any = await getRow('empleado', 'empleado_id', user.empleado_id).then(resp => resp[0]);
            const personData: Person = await getRow('persona', 'person_id', employeeData.persona_id).then(resp => resp[0]);
            //Generando Token
            const expiresIn: number = 8*60*60;
            const accessToken = jwt.sign({id: user.usuario_id}, process.env.SECRETKEY || 'secret', {
                expiresIn: expiresIn
            });

            return await res.json({
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
                    person: {
                        ...personData
                    },
                    accessData: {
                        accessToken,
                        expiresIn
                    }
                }
            });
        } else {
            res.json({message: 'wrong password'});
        }
    } else {
        res.status(401).json({message: 'user not found'});
    }

}

