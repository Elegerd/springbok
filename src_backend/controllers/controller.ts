import { Response } from 'express'
import Request from '../types/request'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const config = require('../config');
const User = require('../modals/user');
const Session = require('../modals/session');

exports.sign_up = (req: Request, res: Response) => {
    console.log("Sign Up");

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save().then(
        res.send("User registered successfully!")
    ).catch((err: Error) => {
        res.status(500).send("Fail! Error -> " + err);
    });
};

exports.sign_in = (req: Request, res: Response) => {
    console.log("Sign In");
    console.log(req.body);

    User.findOne({ username: req.body.username })
        .exec((err: { kind: string; }, user: { password: string; _id: any; email: string, username: string }) => {
            if (err){
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with Username = " + req.body.username
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving User with Username = " + req.body.username
                });
            }

            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
            }

            let accessExpressIn = 1800;
            let refreshExpiresIn = 2592000;
            const accessToken = jwt.sign({
                id: user._id,
                username: user.username,
                email: user.email,
                expiresIn: accessExpressIn
            },
                config.secret, {
                expiresIn: accessExpressIn
            });

            const session = new Session({
                user: user,
                fingerprint: req.body.fingasderprint,
                expiresIn: refreshExpiresIn
            });

            session.save().then((rp: any) => {
                console.log("Session saved!", rp._id);
                res.status(200).send({
                    auth: true,
                    user: {
                        username: user.username,
                        email: user.email
                    },
                    token: {
                        accessToken,
                        refreshToken: rp._id.toString()
                    }
                })
            }).catch((err: Error) => {
                res.status(500).send("Fail! Error -> " + err);
            });
        });
};