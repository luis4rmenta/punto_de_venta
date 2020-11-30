import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request | any, res: Response, next: NextFunction) {
    try {
    
        if (!req.headers.authorization) {
            return res.status(401).send('deauthenticate request');
        }
    
        const token = req.headers.authorization.split(' ')[1];
        if (token === null) {
            return res.status(401).send('deauthenticate request');
        }
    
        const payload: any = jwt.verify(token, process.env.SECRETKEY || 'secret')
        req.userId = payload.id;
        next();
    } catch (error) {
        return res.status(401).send('deauthenticate request');
    }
}

