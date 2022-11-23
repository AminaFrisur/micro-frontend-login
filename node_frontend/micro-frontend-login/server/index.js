import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import * as std from 'std';
import * as http from 'wasi_http';
import * as net from 'wasi_net';
import {parseFormLoginData, makeRequest, parseFormRegisterData, extractPasswordAndTokenFromUrl, extractAuthTokenFromLoginResponse, checkCookie} from '../src/ApiHelper.js'

// Import React Komponenten
import Login from '../src/components/Login.js'
import Register from '../src/components/Register.js'
import Error from "../src/components/Error.js";
import GetUsersAdmin from "../src/components/GetUsersAdmin";



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

    let newCookie = false;
    let authToken = null;
    let loginName = null;

    print('Benutzerverwaltung Micro-Frontend: Uri ist:', req.uri)
    print('Benutzerverwaltung Micro-Frontend: Request Method ist:', req.method)

    let contentType = '';

    let resp = new http.WasiResponse();
    let content = '';

    if (req.uri == '/login' && req.method.toUpperCase() === "GET") {
        const app = ReactDOMServer.renderToString(<Login />);
        content = std.loadFile('./build/index.html');
        content = content.replace('<div id="root"></div>', `<div id="root">${app}</div>`);

    } else if (req.uri == '/login' && req.method.toUpperCase() === "POST") {
        let loginData = parseFormLoginData(parameter);
        let response = await makeRequest(loginData, { 'Content-Type': 'application/json'}, "localhost", "8000", "/login", "POST");
        if(response) {
            newCookie = true;
            contentType = 'text/json; charset=utf-8;';
            authToken = extractAuthTokenFromLoginResponse(response)
            loginName = loginData.login_name;
            console.log("AUTH TOKEN IST: " + authToken);
            // TODO: Render Willkommensseite oder so
            content = "Login war erfolgreich!";

        } else {
            const app = ReactDOMServer.renderToString(<Login error={true} />);
            content = std.loadFile('./build/index.html');
            content = content.replace('<div id="root"></div>', `<div id="root"><p>${app}</p></div>`);
        }

    } else if (req.uri == '/register' && req.method.toUpperCase() === "GET") {
        const app = ReactDOMServer.renderToString(<Register />);
        content = std.loadFile('./build/index.html');
        content = content.replace('<div id="root"></div>', `<div id="root">${app}</div>`);

    } else if (req.uri == '/register' && req.method.toUpperCase() === "POST") {
        let registerData = parseFormRegisterData(parameter);
        let check = registerData.password == registerData.password_repition;
        let error = false;
        let success = false;
        let errorMessage = "";
        // Prüfe ob beide Passwörter gleich sind
        if(!check) {
             error = true
             errorMessage = "Passwörter stimmen nich überein. Bitte noch einmal überprüfen!"

        } else {
            // Post Request zur Benutzerverwaltung
            let response = await makeRequest(registerData, { 'Content-Type': 'application/json'}, "localhost", "8000", "/register", "POST");
            if (response) {
                success=true;
            } else {
                error = true;
                errorMessage = "Registrierung fehlgeschlagen!";
            }

        }
        const app = ReactDOMServer.renderToString(<Register error={error} errorMessage={errorMessage} success={success}
                                                            login_name={registerData.login_name} password={registerData.password}
                                                            password_repition={registerData.password_repition} email={registerData.email}
                                                            firstname={registerData.firstname} lastname={registerData.lastname}
                                                            street={registerData.street} house_number={registerData.house_number}
                                                            postal_code={registerData.postal_code}
        />);
        content = std.loadFile('./build/index.html');
        content = content.replace('<div id="root"></div>', `<div id="root">${app}</div>`);
    }

    else if((req.uri.search('/getUsers?')  == 0) && req.method.toUpperCase() === "GET") {
        // Überprüfe zuerst das Token

        checkCookie(req);

        let app;
        content = std.loadFile('./build/index.html');
        let authParams = extractPasswordAndTokenFromUrl(req.uri);
        let response = await makeRequest(null, { 'Content-Type': 'application/json', 'login_name': authParams.loginName, 'auth_token': authParams.authToken},
                                    "localhost", "8000", "/getUsers", "GET");
        if(response) {
            let userList = JSON.parse(response);
            console.log("TEST USERLIST ARRAY: " + userList[0].id);
            app = ReactDOMServer.renderToString(<GetUsersAdmin userList={userList} />);

        } else {
            console.log("GetUsers failed!");
            app = ReactDOMServer.renderToString(<Error errorMessage={"Entweder ist der Nutzer nicht authorisiert oder die Abfrage an die Benutzerverwaltung schlug fehl"}/>);
        }
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
    if(contentType == '') {
        contentType = 'text/html; charset=utf-8';
    }

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

    if(newCookie) {

        console.log("Benutzerverwaltung Micro-Frontend: Es wurde ein neues Auth Token erstellt, setze somit neuen Cookie")
        resp.headers = {
            'Content-Type': contentType,
            'Set-Cookie': "auth_token=" + authToken + "; login_name=" + loginName
        }
        console.log(JSON.stringify(resp.headers));
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