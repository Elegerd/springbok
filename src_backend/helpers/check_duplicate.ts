import { Request, Response, NextFunction } from 'express'

const User = require('../models/user');

const checkDuplicateUserNameOrEmail = (req: Request, res: Response, next: NextFunction) => {
    User.findOne({ username: req.body.username })
        .exec((err: { kind: string; }, user: any) => {
            if (err && err.kind !== 'ObjectId') {
                res.status(500).send({
                    message: "Error retrieving User with Username = " + req.body.username
                });
                return;
            }
            if (user) {
                res.status(400).send("Fail -> Username is already taken!");
                return;
            }

            User.findOne({ email: req.body.email })
                .exec((err: { kind: string; }, user: any) => {
                    if (err && err.kind !== 'ObjectId'){
                        res.status(500).send({
                            message: "Error retrieving User with Email = " + req.body.email
                        });
                        return;
                    }
                    if (user) {
                        res.status(400).send("Fail -> Email is already in use!");
                        return;
                    }
                    next();
                });
        });
};

export default checkDuplicateUserNameOrEmail;