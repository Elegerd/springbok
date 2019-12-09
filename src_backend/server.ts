import http from 'http';
import redis from 'redis';
import express from 'express';
import socketIo from 'socket.io';
import bodyParser from 'body-parser';
import expressSession from 'express-session';

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const sharedSession = require('express-socket.io-session');
const RedisStore = require('connect-redis')(expressSession);
const redisClient = redis.createClient();

const session = expressSession({
    store: new RedisStore({ client: redisClient }),
    secret: "springbok",
    resave: false,
    saveUninitialized: false
});

// Attach session
app.use(session);

app.use(bodyParser.json({ limit: "15mb" }));

// Share session with io sockets
io.use(
    sharedSession(session, {
        autoSave: true
    })
);

//Debugging express
app.use('*', function(req, res, next) {
    console.debug("Session: ", req.session);
    console.debug("SessionId: ", req.sessionID);
    next();
});

// Debugging io
io.use(function(socket, next) {
    console.debug('socket.handshake session data is %j.', socket.handshake.session);
    next();
});

// Set session data via express request
app.post('/login', function(req, res) {
    console.debug('Requested /login');
    req!.session!.user = {
        username: req.body
    };
    res.send({ result: 'OK', message: 'Session updated', session: req.session, id: req.sessionID});
});

// Unset session data via express request
app.post('/logout', function(req, res) {
    console.debug('Requested /logout');
    delete req!.session!.user;
    res.send({ result: 'OK', message: 'Session destroyed' });
});

io.on('connection', function(socket) {
    socket.emit('sessiondata', socket.handshake.session);
    // Set session data via socket
    console.debug('Emitting session data');
    socket.on('login', function() {
        console.debug('Received login message');
        socket!.handshake!.session!.user = {
            username: 'OSK'
        };
        console.debug('socket.handshake session data is %j.', socket.handshake.session);

        // socket.handshake.session.save();
        // emit logged_in for debugging purposes of this example
        socket.emit('logged_in', socket.handshake.session);
    });

    // Unset session data via socket
    socket.on('checksession', function() {
        console.debug('Received checksession message');
        console.debug('socket.handshake session data is %j.', socket.handshake.session);

        socket.emit('checksession', socket.handshake.session);
    });

    // Unset session data via socket
    socket.on('logout', function() {
        console.debug('Received logout message');
        delete socket!.handshake!.session!.user;
        // socket.handshake.session.save();
        // emit logged_out for debugging purposes of this example
        console.debug('socket.handshake session data is %j.', socket.handshake.session);

        socket.emit('logged_out', socket.handshake.session);
    });
});

server.listen(process.env.PORT || 3001);