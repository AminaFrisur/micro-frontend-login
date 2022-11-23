import React from 'react';
import {Col} from 'react-bootstrap';
class Welcome extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <br/>
                <Col md="12">
                    <div>
                        <h1>Welcome to my Carsharing Platform</h1>
                    </div>
                </Col>
                <br/>
            </div>
        );
    }
}

export default Welcome;