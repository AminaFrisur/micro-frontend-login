import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import * as std from 'std';
import * as http from 'wasi_http';
import * as net from 'wasi_net';
import {parseFormLoginData, makePostRequest, parseFormRegisterData} from '../src/ApiHelper.js'

// import App from '../src/App.js';
import Login from '../src/components/Login.js'
import Register from '../src/components/Register.js'

async function handle_client(cs) {
    let buffer = new http.Buffer();
    let parameter;

    while (true) {
        try {
            let d = await cs.read();
            if (d == undefined || d.byteLength <= 0) {
                return;
            }
            buffer.append(d);
            parameter = new TextDecoder().decode(buffer);
            let req = buffer.parseRequest();
            if (req instanceof http.WasiRequest) {
                handle_req(cs, req, parameter);
                break;
            }
        } catch (e) {
            print(e);
        }
    }
}

function enlargeArray(oldArr, newLength) {
    let newArr = new Uint8Array(newLength);
    oldArr && newArr.set(oldArr, 0);
    return newArr;
}

async function handle_req(s, req, parameter) {
    print('Benutzerverwaltung Micro-Frontend: Uri ist:', req.uri)
    print('Benutzerverwaltung Micro-Frontend: Request Method ist:', req.method)

    let resp = new http.WasiResponse();
    let content = '';

    if (req.uri == '/login' && req.method.toUpperCase() === "GET") {
        const app = ReactDOMServer.renderToString(<Login />);
        content = std.loadFile('./build/index.html');
        content = content.replace('<div id="root"></div>', `<div id="root">${app}</div>`);

    } else if (req.uri == '/login' && req.method.toUpperCase() === "POST") {
        // in diesem Fall versucht sich der User anzumelden
        content = std.loadFile('./build/index.html');
        let loginData = parseFormLoginData(parameter);
        let response = await makePostRequest(loginData, { 'Content-Type': 'application/json'}, "localhost", "8000", "/login");
        if(response) {
            content = content.replace('<div id="root"></div>', `<div id="root"><p>Anmeldung ist erfolgreich gewesen</p></div>`);
        } else {
            const app = ReactDOMServer.renderToString(<Login error="true" />);
            content = content.replace('<div id="root"></div>', `<div id="root">${app}</div>`);
        }

    } else if (req.uri == '/register' && req.method.toUpperCase() === "GET") {
        const app = ReactDOMServer.renderToString(<Register />);
        content = std.loadFile('./build/index.html');
        content = content.replace('<div id="root"></div>', `<div id="root">${app}</div>`);

    } else if (req.uri == '/register' && req.method.toUpperCase() === "POST") {
        let registerData = parseFormRegisterData(parameter);
        let check = registerData.password == registerData.passwordRepition;
        let app;
        // Passwort
        if(!check) {
            app = ReactDOMServer.renderToString(<Register error="true" errorMessage="Passwörter stimmen nich übernein. Bitte noch einmal überprüfen!" />);
        } else {

            // Post Request zur Benutzerverwaltung
            let response = await makePostRequest(registerData, { 'Content-Type': 'application/json'}, "localhost", "8000", "/register");
            if (response) {
                app = ReactDOMServer.renderToString(<Register success="true" />);
            } else {
                app = ReactDOMServer.renderToString(<Register success="true" errorMessage="Registrierung fehlgeschlagen!"/>);
            }

        }
        content = std.loadFile('./build/index.html');
        content = content.replace('<div id="root"></div>', `<div id="root">${app}</div>`);
    }

    else {
        let chunk = 1000; // Chunk size of each reading
        let length = 0; // The whole length of the file
        let byteArray = null; // File content as Uint8Array

        // Read file into byteArray by chunk
        let file = std.open('./build' + req.uri, 'r');
        while (true) {
            byteArray = enlargeArray(byteArray, length + chunk);
            let readLen = file.read(byteArray.buffer, length, chunk);
            length += readLen;
            if (readLen < chunk) {
                break;
            }
        }
        content = byteArray.slice(0, length).buffer;
        file.close();
    }
    let contentType = 'text/html; charset=utf-8';
    if (req.uri.endsWith('.css')) {
        contentType = 'text/css; charset=utf-8';
    } else if (req.uri.endsWith('.js')) {
        contentType = 'text/javascript; charset=utf-8';
    } else if (req.uri.endsWith('.json')) {
        contentType = 'text/json; charset=utf-8';
    } else if (req.uri.endsWith('.ico')) {
        contentType = 'image/vnd.microsoft.icon';
    } else if (req.uri.endsWith('.png')) {
        contentType = 'image/png';
    }
    resp.headers = {
        'Content-Type': contentType
    };

    let r = resp.encode(content);
    s.write(r);
}

async function server_start() {
    print('listen 8002...');
    try {
        let s = new net.WasiTcpServer(8002);
        for (var i = 0; ; i++) {
            let cs = await s.accept();
            handle_client(cs);
        }
    } catch (e) {
        print(e);
    }
}

server_start();