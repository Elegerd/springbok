import { Request, Response, NextFunction } from 'express'
import { User } from "../types"
import { CastError } from "mongoose";

const User = require('../models/user');

const checkDuplicateUserNameOrEmail = (req: Request, res: Response, next: NextFunction) => {
    try {
        User.findOne({ username: req.body.username }).exec()
            .then((user: User) => {
                if (user) {
                    res.status(400).send({
                        message: "Username is already in use!"
                    });
                    return;
                }
                User.findOne({ email: req.body.email }).exec()
                    .then((user: User) => {
                        if (user) {
                            res.status(400).send({
                                message: "Email is already in use!"
                            });
                            return;
                        }
                        next();
                    })
                    .catch((err: CastError) => {
                        if (err.kind !== 'ObjectId'){
                            res.status(500).send({
                                message: "Error retrieving User with Email = " + req.body.email
                            });
                            return;
                        }
                    })
            })
            .catch((err: CastError) => {
                if (err.kind !== 'ObjectId') {
                    res.status(500).send({
                        message: "Error retrieving User with Username = " + req.body.username
                    });
                    return;
                }
                res.status(404).send({
                    message: "Error retrieving User with Username = " + req.body.username
                });
                return;
            })
    } catch (e) {
        res.status(500).send(e);
    }
};

export default checkDuplicateUserNameOrEmail;