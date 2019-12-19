import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import Request from '../types/request'

const config = require('../config');

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {


    let headers = req.headers;
    console.log(headers);
    let token = headers.get('x-access-token');


    if (!token) {
        return res.status(403).send({
            auth: false, message: 'No token provided.'
        });
    }

    jwt.verify(token, config.secret, (err: Error, decoded: any) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: 'Fail to Authentication. Error -> ' + err
            });
        }
        req.userId = decoded.id;
        next();
    });
};