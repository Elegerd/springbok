import { Response, NextFunction } from 'express'
import Request from '../types/request'

const User = require('../modals/user');

export const checkDuplicateUserNameOrEmail = (req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    User.findOne({ username: req.body.username })
        .exec((err: { kind: string; }, user: any) => {
            if (err && err.kind !== 'ObjectId') {
                console.debug("Error retrieving User with Username = " + req.body.username);
                res.status(500).send({
                    message: "Error retrieving User with Username = " + req.body.username
                });
                return;
            }
            if (user) {
                console.debug("Fail -> Username is already taken!");
                res.status(400).send("Fail -> Username is already taken!");
                return;
            }

            User.findOne({ email: req.body.email })
                .exec((err: { kind: string; }, user: any) => {
                    if (err && err.kind !== 'ObjectId'){
                        console.debug("Error retrieving User with Email = " + req.body.email);
                        res.status(500).send({
                            message: "Error retrieving User with Email = " + req.body.email
                        });
                        return;
                    }
                    if (user) {
                        console.debug("Fail -> Email is already in use!");
                        res.status(400).send("Fail -> Email is already in use!");
                        return;
                    }
                    next();
                });
        });
};