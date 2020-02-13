import { Router, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

const config = require('../config');
const Session = require('../models/session');
const router = Router();


router.post('/verification', (req: Request, res: Response) => {
    console.log("Verification token");

    let headers = req.headers;
    let token = headers['authorization'];

    if (!token) {
        return res.status(403).send({
            auth: false, message: 'No token provided.'
        });
    }

    jwt.verify(token.substring(7), config.secret, (err: Error, decoded: any) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: 'Fail to authentication. Error -> ' + err
            });
        }
        return res.status(200).send({
            auth: true,
            user: {
                username: decoded.username,
                email: decoded.email
            },
            message: 'Successful authentication'
        });
    });
});

router.post('/refresh', (req: Request, res: Response) => {
    console.log("Refresh token");

    let token = req.body.refreshToken;
    let fingerprint = req.body.fingerprint;

    if (!token || !fingerprint) {
        return res.status(403).send({
            auth: false, message: 'No token or fingerprint provided.'
        });
    }

    Session.find(token)
        .exec((err: { kind: string; }, session: any) => {
            if (err && err.kind !== 'ObjectId') {
                return res.status(500).send({
                    message: "Error retrieving Session with Token = " + token
                });
            }
            if (session && session.fingerprint === fingerprint) {
                return res.status(200).send(session);
            } else
                return res.status(500).send({ message: "Fail -> No matches!"})
        });
});

export default router;