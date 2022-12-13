import React from 'react';
import {Form, Alert, Col, Row, Button} from 'react-bootstrap';
class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            error : false,
        };

        if(props.error) {this.state.error = error;}
    }

    render() {
        return (
            <div>
                <h1>Login into application</h1>
                <br/>
                <Form action="/login"
                      method="post">

                    <Form.Group>
                        <Col md="12">
                            <Form.Label>Login Name</Form.Label>
                            <Form.Control type="text" name="login_name" placeholder="Bitte geben Sie ihren Login Namen ein"/>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Col md="12">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Bitte geben Sie ihr Passwort ein"/>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Col md="12">
                            <Button variant="primary" className="btn-block" type="submit">Login</Button>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Col md="12">
                            <Alert variant="danger" show={this.state.error} >
                                Login Fehlgeschlagen
                            </Alert>
                        </Col>
                    </Form.Group>
                </Form>
                <br/>
                <Row>
                    <small className="form-text text-muted"><a href="/register">Don't have an Account? Here you can register :)</a></small>
                </Row>
            </div>
        );
    }
}

export default Login;