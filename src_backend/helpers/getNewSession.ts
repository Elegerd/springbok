import { User } from "../types";

const Session = require('../models/session');
const config = require('../config/index');

const getNewSession = (user: User, fingerprint: string) => {
    return new Session({
        user: user,
        fingerprint: fingerprint,
        expiresIn: config.refreshExpiresIn
    });
};

export default getNewSession;