import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request | any, res: Response, next: NextFunction) {
    try {
        console.log(req.headers.authorization);
    
        if (!req.headers.authorization) {
            return res.status(401).send('deauthenticate request');
        }
    
        const token = req.headers.authorization.split(' ')[1];
        if (token === null) {
            return res.status(401).send('deauthenticate request');
        }
    
        const payload: any = jwt.verify(token, process.env.SECRETKEY || 'secret')
        console.log(payload);
        req.userId = payload.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).send('deauthenticate request');
    }
}

