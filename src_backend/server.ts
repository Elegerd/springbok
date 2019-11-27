import express = require('express');
import expressWs = require('express-ws');
const app = expressWs(express()).app;

app.use(function (req: any, res: any, next: () => any) {
    console.log('middleware');
    return next();
});

app.get('/', function(){
    console.log('get route /');
});

app.ws('/', function(ws: { on: (arg0: string, arg1: (msg: any) => void) => void; }, req: any) {
    ws.on('message', function(msg) {
        console.log(msg);
    });
});

app.get('/echo', function(){
    console.log('get route /echo');
});

app.ws('/echo', function(ws: { on: (arg0: string, arg1: (msg: any) => void) => void; send: (arg0: any) => void; }, req: any) {
    ws.on('message', function(msg) {
        ws.send(msg);
    });
});

app.listen(3000);
