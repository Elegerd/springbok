import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const config = require('./config');
const server = http.createServer(app);

app.use(bodyParser.json({ limit: "15mb" }));

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