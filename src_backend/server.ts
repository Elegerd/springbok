import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import socketIo from 'socket.io';
import socketIoJwt from 'socketio-jwt';
import routes from "./routes";

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const config = require('./config');

app.use(bodyParser.json({ limit: "15mb" }));
app.use('/api/', routes);

io.on('connection', socketIoJwt.authorize({
    decodedPropertyName: 'my_decoded_token',
    secret: config.secret,
    timeout: 15000
}));

io.on('authenticated', (socket: { my_decoded_token: any; }) => {
    console.log('new decoded token:', socket.my_decoded_token);
});

// Configuring the database
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.mongodbUrl, {
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