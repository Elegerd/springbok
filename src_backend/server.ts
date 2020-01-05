import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import socketIo from 'socket.io';
import socketIoJwt from 'socketio-jwt';

const app = express();
const config = require('./config');
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json({ limit: "15mb" }));

io.on('connection', socketIoJwt.authorize({
    decodedPropertyName: 'my_decoded_token',
    secret: config.secret,
    timeout: 15000
}));

io.on('authenticated', (socket: { my_decoded_token: any; }) => {
    console.log('new decoded token:', socket.my_decoded_token); // new decoded token
});

require('./routers')(app);

// Configuring the database
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(() => {
        console.log('Successfully connected to MongoDB.');
    })
    .catch(() => {
        console.log('Could not connect to MongoDB.');
        process.exit();
    });

server.listen(process.env.PORT || 3001);