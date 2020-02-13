import { Router, Response, Request } from 'express';
import verifySignUp from '../helpers/check_duplicate'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const config = require('../config');
const User = require('../models/user');
const Session = require('../models/session');
const router = Router();


router.post('/sign_in', (req: Request, res: Response) => {
    console.log("Sign In");

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
                res.status(200).send({
                    auth: true,
                    user: {
                        username: user.username,
                        email: user.email
                    },
                    token: {
                        accessToken,
                        refreshToken: rp._id.toString()
                    },
                    message: "Successful authentication"
                })
            }).catch((err: Error) => {
                res.status(500).send("Fail! Error -> " + err);
            });
        });
});

router.post("/sign_up", [ verifySignUp, (req: Request, res: Response) => {
    console.log("Sign Up");

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save().then(() =>
        res.status(201).send("User registered successfully!")
    ).catch((err: Error) =>
        res.status(500).send("Fail! Error -> " + err)
    );
}]);

export default router;