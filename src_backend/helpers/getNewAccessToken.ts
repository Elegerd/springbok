import jwt from "jsonwebtoken";
import { User } from "../types";

const config = require('../config/index');

const getNewAccessToken = (user: User) => {
    return jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            expiresIn: config.accessExpressIn
        },
        config.secret, {
            expiresIn: config.accessExpressIn
        });
};

export default getNewAccessToken;