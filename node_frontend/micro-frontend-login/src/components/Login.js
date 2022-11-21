import React from 'react';
import {Form, Alert, Col, Row } from 'react-bootstrap';
// import {makeRequest} from "../api/httpClient.mjs";
import ButtonLoader from './ButtonLoader.js'

let assets = {
    'main.js': '/main.js',
    'main.css': '/main.css',
};


class Login extends React.Component {

    constructor(props) {
        super(props);
        // this.makeRequest = makeRequest();
        this.state = {
            password: undefined,
            loginName: undefined,
            passwordToken: "",
            loading: false,
            success : false,
            error : false
        };
    }

    render() {
        return (
            <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <title>Welctome to carsharing Test</title>
                <link rel="stylesheet" href={assets['main.css']} />
            </head>
            <body>
            <div>
                <h1>Login into application</h1>
                <Form action="http://localhost:8002/login"
                      method="post">

                    <Form.Group as={Row}>
                        <Col md="4">
                            <Form.Label>Login Name</Form.Label>
                            <Form.Control type="text" name="loginName" placeholder="Bitte geben Sie ihren Login Namen ein"/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col md="4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Bitte geben Sie ihr Passwort ein"/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col md="12">
                            <ButtonLoader loading={this.state.loading} description={"Set Password"}></ButtonLoader>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col md="12">
                            <Alert variant="success" show={this.state.success}>
                                Login Success!
                            </Alert>
                            <Alert variant="danger" show={this.state.error} >
                                {this.state.error}
                            </Alert>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
            </body>
            </html>
        );
    }
}

export default Login;