import express = require('express');
import expressWs = require('express-ws');
const expressWss = expressWs(express());
const app = expressWss.app;

app.use(function (req: any, res: any, next: () => any) {
    console.log('Middleware');
    return next();
});

app.get('/', function(req, res) {
    console.log('get route /');
    res.send('hello world!');
});

app.ws('/', function(ws: { on: (arg0: string, arg1: (msg: any) => void) => void; }, req: any) {
    ws.on('message', function(msg) {
        console.log('WS: Received: %s', msg);
    });
});

app.get('/echo', function(req, res) {
    console.log('get route /echo!');
    res.send({ hello: 'world!' });
});

app.ws('/echo', function(ws: { on: (arg0: string, arg1: (msg: any) => void) => void; send: (arg0: any) => void; }, req: any) {
    ws.on('message', function(msg) {
        console.log('WS: Received: %s', msg);
        ws.send(msg);
    });
});

app.listen(process.env.PORT || 3001);
