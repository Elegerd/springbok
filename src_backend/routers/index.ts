import { Express } from "express";

const verifySignUp = require('./verifySignUp');
const authJwt = require('./verifyJwtToken');

module.exports = function(app: Express) {

    const controller = require("../controllers/controller");

    app.use('*', function(req, res, next) {
        console.debug("Middleware");
        next();
    });

    app.post('/sign_up', [verifySignUp.checkDuplicateUserNameOrEmail], controller.sign_up);

    app.post('/sign_in', controller.sign_in);

    app.get('/verifyToken', authJwt.verifyToken);
};