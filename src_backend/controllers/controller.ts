import { Response } from 'express'
import Request from '../types/request'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const config = require('../config');
const User = require('../modals/user');

exports.userContent = (req: Request, res: Response) => {
    User.findOne({ _id: req.userId })
        .select('-_id -__v -password')
        .populate('roles', '-_id -__v')
        .exec((err: { kind: string; }, user: any) => {
            if (err){
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with _id = " + req.userId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving User with _id = " + req.userId
                });
            }

            res.status(200).json({
                "description": "User Content Page",
                "user": user
            });
        });
};

exports.sign_up = (req: Request, res: Response) => {
    // Save User to Database
    console.log("Processing func -> SignUp");

    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    // Save a User to the MongoDB
    user.save().then(
        res.send("User registered successfully!")
    ).catch((err: Error) => {
        res.status(500).send("Fail! Error -> " + err);
    });
};

exports.sign_in = (req: Request, res: Response) => {
    console.log("Sign-In");

    User.findOne({ username: req.body.username })
        .exec((err: { kind: string; }, user: { password: any; _id: any; }) => {
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

            const token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, accessToken: token, userName: req.body.username });
        });
};