"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    try {
        console.log(req.headers.authorization);
        if (!req.headers.authorization) {
            return res.status(401).send('deauthenticate request');
        }
        const token = req.headers.authorization.split(' ')[1];
        if (token === null) {
            return res.status(401).send('deauthenticate request');
        }
        const payload = jsonwebtoken_1.default.verify(token, process.env.SECRETKEY || 'secret');
        console.log(payload);
        req.userId = payload.id;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).send('deauthenticate request');
    }
}
exports.verifyToken = verifyToken;
