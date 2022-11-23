import React from 'react';
import {Alert, Col} from 'react-bootstrap';
class ErrorAuth extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <br/>
                <Col md="12">
                    <Alert variant="danger">
                        Sie haben keinen Zugriff auf diese Seite. Bitte Authentifizieren Sie sich vorher!
                    </Alert>
                </Col>
                <br/>
            </div>
        );
    }
}

export default ErrorAuth;