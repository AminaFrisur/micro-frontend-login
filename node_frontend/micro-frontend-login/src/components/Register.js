import React from 'react';
import {Alert, Button, Col, Form} from 'react-bootstrap';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            error: false,
            errorMessage: null,
            login_name: null,
            password: null,
            password_repition: null,
            email: null,
            firstname: null,
            lastname: null,
            street: null,
            house_number: null,
            postal_Code: null
        };

        if(props.success) { this.state.success = props.success };
        if(props.error) { this.state.error = props.error };
        if(props.errorMessage) { this.state.errorMessage = props.errorMessage};
        if(props.login_name) { this.state.login_name = props.login_name};
        if(props.password) { this.state.password = props.password};
        if(props.password_repition) { this.state.password_repition = props.password_repition};
        if(props.email) { this.state.email = props.email};
        if(props.firstname) { this.state.firstname = props.firstname};
        if(props.lastname) { this.state.lastname = props.lastname};
        if(props.street) { this.state.street = props.street};
        if(props.house_number) { this.state.house_number = props.house_number};
        if(props.postal_Code) { this.state.postal_Code = props.postal_Code};
    }

    render() {
        return (
            <div>
                <h1>Register into application</h1>
                <br/>
                <Form action="http://localhost:8002/register" method="post">
                    <Form.Group>
                        <Col md="12">
                            <Form.Label>Login Name</Form.Label>
                            <Form.Control type="text" name="login_name" placeholder="Bitte geben Sie einen Login Namen ein"/>
                            <small className="form-text text-muted">Bitte wählen Sie ihren Login Namen mit bedacht. Dieser ist später nicht veränderbar und sollte auch Eindeutig sein</small>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Col md="12">
                            <Form.Label>Passwort</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Bitte geben Sie Ihr Passwort ein" required/>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Col md="12">
                            <Form.Label>Wiederholung Passwort</Form.Label>
                            <Form.Control type="password" name="password_repition" placeholder="Bitte wiederholen Sie Ihr Passwort" required/>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Col md="12">
                            <Form.Label>E-Mail</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Bitte geben Sie eine E-Mail Adresse an" required/>
                            <small className="form-text text-muted">Im Gegensatz zum Login Namen ist die E-Mail Adresse später änderbar</small>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Col md="12">
                            <Form.Label>Vorname</Form.Label>
                            <Form.Control type="text" name="firstname" placeholder="Bitte geben Sie Ihren Vornamen an"/>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Col md="12">
                            <Form.Label>Nachname</Form.Label>
                            <Form.Control type="text" name="lastname" placeholder="Bitte geben Sie Ihren Nachnamen an" required/>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Col md="12">
                            <Form.Label>Straße</Form.Label>
                            <Form.Control type="text" name="street" placeholder="Bitte wiederholen Sie die Straße Ihrer Wohnadresse an" required/>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Col md="12">
                            <Form.Label>Hausnummer</Form.Label>
                            <Form.Control type="number" name="house_number" placeholder="Bitte wiederholen Sie die Hausnummer Ihrer Wohnadresse an" required/>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Col md="12">
                            <Form.Label>Postleitzahl</Form.Label>
                            <Form.Control type="number" name="postal_code" placeholder="Bitte wiederholen Sie die PLZ Ihrer Wohnadresse an" required/>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group >
                        <Col md="12">
                            <Button hidden={this.state.success} variant="primary" className="btn-block" type="submit">Registrierung anfordern</Button>
                        </Col>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Col md="12">
                            <Alert variant="success" show={this.state.success} >
                                Registrierung war Erfolgreich !
                            </Alert>
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Col md="12">
                            <Alert variant="danger" show={this.state.error} >
                                Registrierung Fehlgeschlagen: {this.state.errorMessage}
                            </Alert>
                        </Col>
                    </Form.Group>
                </Form>
                <br/>
            </div>
        );
    }
}

export default Register
