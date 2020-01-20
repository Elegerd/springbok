import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import Request from '../types/request'

const config = require('../config');

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    let headers = req.headers;
    console.log("Headers:", headers);
    let token = headers['authorization'];

    if (!token) {
        console.error('No token provided.');
        return res.status(403).send({
            auth: false, message: 'No token provided.'
        });
    }

    jwt.verify(token.substring(7), config.secret, (err: Error, decoded: any) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: 'Fail to Authentication. Error -> ' + err
            });
        }
        return res.status(200).send({
            auth: true,
            user: {
                username: decoded.username,
                email: decoded.email
            },
            message: 'Successful Authentication'
        });
    });
};