import * as React from 'react';
// https://reactjs.org/docs/react-dom-server.html#rendertopipeablestream
import {renderToPipeableStream} from 'react-dom/server';
import { createServer } from 'http';
import {parseFormData} from'./api/parseFormData.js'
import fs from 'fs';

import Login from './component/Login.jsx';
const css = fs.readFileSync("./public/main.css");

createServer(async (req, res) => {

    console.log("Login Micro-Frontend: New Request incoming");
    console.log("Login Micro-Frontend: Url is: " + req.url);
    console.log("Login Micro-Frontend: Request Method is: " + req.method);

    if (req.url == '/main.css' && req.method.toUpperCase() === "GET") {
        res.setHeader('Content-Type', 'text/css; charset=utf-8')
        res.end(css);
    } else if (req.url == '/favicon.ico' && req.method.toUpperCase() === "GET") {
        res.end()
    } else if (req.url == '/login' && req.method.toUpperCase() === "GET") {
        res.setHeader('Content-type', 'text/html');
        renderToPipeableStream(<Login />).pipe(res);
    } else if (req.url == '/login' && req.method.toUpperCase() === "POST") {
            console.log(await parseFormData(req));
        renderToPipeableStream(<div><p>Login Parsing war Erfolgreich</p></div>).pipe(res);
    } else {
        res.setHeader('Content-type', 'text/html');
        renderToPipeableStream(<div><p>Login Frontend: Route not found</p></div>).pipe(res);
    }
}).listen(8001, () => {
    console.log('listen 8001...');
})