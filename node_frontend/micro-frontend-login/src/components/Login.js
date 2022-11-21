import React from 'react';
import {Form, Alert, Col, Row, Button} from 'react-bootstrap';
let assets = {
    'main.js': '/main.js',
    'main.css': '/main.css',
};


class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error : false
        };

        if(props.error) {
            this.state.error = true;
        }

    }

    render() {
        return (
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
                            <Button variant="primary" className="btn-block" type="submit"></Button>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col md="12">
                            <Alert variant="danger" show={this.state.error} >
                                Login Failed
                            </Alert>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default Login;