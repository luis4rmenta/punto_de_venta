import { Request, Response, NextFunction } from 'express';
import { getRow } from '../controllers/mysql.controller';

export async function isModerator(req: Request | any, res: Response, next: NextFunction) {
    const {empleado_id} =  await getRow('usuario', 'usuario_id', req.userId).then((resp: any) => resp[0]);
    const {tipo_empleado_id} = await getRow('empleado', 'empleado_id', empleado_id).then((resp: any) => resp[0]);

    if (tipo_empleado_id === 2 || tipo_empleado_id === 1) {
        next();
    } else {
        return res.status(401).json({
            message: 'Access denied'
        });
    }
}
