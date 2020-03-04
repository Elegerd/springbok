import { Router, Response, Request } from 'express';
import { CastError } from "mongoose";
import verifySignUp from '../helpers/checkDuplicate'
import getNewAccessToken from "../helpers/getNewAccessToken";
import getNewSession from "../helpers/getNewSession";
import { User, Session } from "../types";
import bcrypt from 'bcryptjs';

const User = require('../models/user');
const router = Router();

router.post('/sign_in', (req: Request, res: Response) => {
    try {
        User.findOne({ username: req.body.username }).exec()
            .then((user: User) => {
                const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                if (!passwordIsValid) {
                    res.status(401).send({
                        auth: false, message: "Invalid Password!"
                    });
                    return;
                }

                const accessToken =  getNewAccessToken(user);
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
                            message: "Successful authentication!"
                        });
                        return;
                    })
                    .catch((err: Error) => {
                        res.status(500).send({
                            message: "Error saving session: " + err
                        });
                        return;
                    });
            })
            .catch((err: CastError) => {
                if (err.kind !== 'ObjectId') {
                    res.status(404).send({
                        message: "User not found with Username = " + req.body.username
                    });
                    return;
                }
                res.status(404).send({
                    message: "Error retrieving User with Username = " + req.body.username
                });
                return;
            })
    } catch (e) {
        res.status(500).send(e)
    }
});

router.post("/sign_up", [ verifySignUp, (req: Request, res: Response) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });
        user.save()
            .then(() => {
                res.status(201).send({
                    message: "User registered successfully!"
                });
                return;
            })
            .catch((err: Error) => {
                res.status(500).send({
                    message: "Error saving user: " + err
                });
                return;
            });
    } catch (e) {
        res.status(500).send(e)
    }
}]);

export default router;