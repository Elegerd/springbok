import { Router, Response, Request } from 'express';
import { CastError } from "mongoose";
import jwt from 'jsonwebtoken';
import getNewAccessToken from "../helpers/getNewAccessToken";
import getNewSession from "../helpers/getNewSession";
import {Session} from "../types";

const config = require('../config');
const Session = require('../models/session');
const router = Router();


router.get('/verification', (req: Request, res: Response) => {
    try {
        let headers = req.headers;
        let token = headers['authorization'];

        if (!token) {
            res.status(403).send({
                auth: false, message: 'No token provided.'
            });
            return;
        }

        jwt.verify(token.substring(7), config.secret, (err: Error, decoded: any) => {
            if (err) {
                res.status(500).send({
                    auth: false,
                    message: 'Fail to authentication. Error -> ' + err
                });
                return;
            }
            res.status(200).send({
                auth: true,
                user: {
                    username: decoded.username,
                    email: decoded.email
                },
                message: 'Successful authentication'
            });
            return;
        });
    } catch (e) {
        res.status(500).send(e)
    }
});

router.post('/refresh', (req: Request, res: Response) => {
    try {
        let token = req.body.refreshToken;
        let fingerprint = req.body.fingerprint;

        if (!token || !fingerprint) {
            res.status(403).send({
                auth: false, message: 'No token or fingerprint provided.'
            });
            return;
        }

        Session.findById(token)
            .exec((err: CastError, session: Session) => {
                if (err && err.kind !== 'ObjectId') {
                    res.status(500).send({
                        message: "Error retrieving Session with Token = " + token
                    });
                    return;
                }
                if (session && session.fingerprint === fingerprint) {
                    const user = session.user;
                    Session.findByIdAndRemove(token, (err: CastError) => {
                        if (err && err.kind !== 'ObjectId') {
                            res.status(500).send({
                                message: "Error retrieving Session with Token = " + token
                            });
                            return;
                        } else {
                            const accessToken = getNewAccessToken(user);
                            const session = getNewSession(user, req.body.fingerprint);

                            session.save()
                                .then((response: Session) => {
                                    res.status(200).send({
                                        auth: true,
                                        user: {
                                            username: user.username,
                                            email: user.email
                                        },
                                        token: {
                                            accessToken,
                                            refreshToken: response._id.toString()
                                        },
                                        message: "Successful authentication"
                                    });
                                    return;
                                })
                                .catch((err: Error) => {
                                    res.status(500).send({
                                        message: "Error saving session: " + err
                                    });
                                    return;
                                });
                        }
                    });
                } else {
                    res.status(500).send({ message: "Fail -> No matches!" });
                    return;
                }
            });
    } catch (e) {
        res.status(500).send(e)
    }
});

router.post('/logout',  (req: Request, res: Response) => {
    try {
        let headers = req.headers;
        let token = headers['authorization'];
        let refreshToken = req.body.refreshToken;

        if (typeof token === 'undefined' || typeof refreshToken === 'undefined') {
            res.status(403).send({
                auth: false, message: 'No token provided.'
            });
            return;
        }

        jwt.verify(token.substring(7), config.secret, (err: Error, decoded: any) => {
            if (err) {
                res.status(500).send({
                    auth: false,
                    message: 'Fail to authentication. Error -> ' + err
                });
                return;
            }

            Session.findById(refreshToken).exec()
                .then((session: Session) => {
                    if (session.user._id.toString() !== decoded.id) {
                        res.status(500).send({
                            auth: false,
                            message: 'Fail to authentication. Error -> ' + err
                        });
                        return;
                    }
                    Session.deleteOne({_id: session.user._id}).exec()
                        .then(() => {
                            res.status(200).send({
                                auth: false,
                                message: 'Token destroy'
                            });
                            return;
                        })
                        .catch((err: Error) => {
                            res.status(500).send({
                                message: "Error -> " + err
                            });
                            return;
                        });
                })
                .catch((err: CastError) => {
                    if (err.kind === 'ObjectId') {
                        res.status(404).send({
                            message: "Session not found with refresh token = " + refreshToken
                        });
                        return;
                    }
                    res.status(500).send({
                        message: "Error retrieving Session with refresh token = " + refreshToken
                    });
                    return;
                });
        });
    } catch (e) {
        res.status(500).send(e)
    }
});

export default router;