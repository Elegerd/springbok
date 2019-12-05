import http from 'http';
import WebSocket from 'ws';
import express from 'express';
import session from 'express-session';
import uuid from 'uuid';

const app = express();
const map = new Map();

//
// We need the same instance of the session parser in express and
// WebSocket server.
//
const sessionParser = session({
    saveUninitialized: false,
    secret: '$eCuRiTy',
    resave: false
});

//
// Serve static files from the 'public' folder.
//
app.use(express.static('public'));
app.use(sessionParser);

app.post('/login', function(req, res) {
    //
    // "Log in" user and set userId to session.
    //
    const id = uuid.v4();
    console.log(`Updating session for user ${id} ${req!.session!.userId}`);
    req!.session!.userId = id;
    res.send({ result: 'OK', message: 'Session updated', id: id});
});

app.delete('/logout', function(req, res) {
    const ws = map.get(req!.session!.userId);

    console.log('Destroying session');
    req!.session!.destroy(function() {
        if (ws) ws.close();
        res.send({ result: 'OK', message: 'Session destroyed' });
    });
});

//
// Create HTTP server by ourselves.
//
const server = http.createServer(app);
const wss = new WebSocket.Server({ clientTracking: false, noServer: true });

server.on('upgrade', function(req, res, socket, head) {
    console.log('Parsing session from request...');

    sessionParser(req, res, () => {
        if (!req!.session!.userId) {
            socket.destroy();
            return;
        }

        console.log('Session is parsed!');
        wss.handleUpgrade(req, socket, head, function(ws) {
            wss.emit('connection', ws, req);
        });
    });
});

wss.on('connection', function(ws, req) {
    console.log("THIS!!!");
    // @ts-ignore
    const userId = req.session.userId;

    map.set(userId, ws);

    ws.on('message', function(message) {
        //
        // Here we can now use session parameters.
        //
        console.log(`Received message ${message} from user `);
    });

    ws.on('close', function() {

    });
});

//
// Start the server.
//
app.listen(process.env.PORT || 3001);