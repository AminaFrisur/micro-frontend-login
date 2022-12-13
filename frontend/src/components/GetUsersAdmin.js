import React from 'react';
import {Alert, Col, Table} from "react-bootstrap";

class GetUsersAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            userList: []
        };

        if (props.error) {
            this.state.error = props.error
        }
        if (props.userList) {this.state.userList = props.userList}
    }

    renderTable() {

        console.log(this.state.userList[1]["firstname"]);

        if(this.state.userList.length > 0){
            return this.state.userList.map(function(user){
                return(
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.street}</td>
                        <td>{user.house_number}</td>
                        <td>{user.postal_code}</td>
                        <td>{user.login_name}</td>
                    </tr>
                )
            })
        } else {
            return []
        }
    }

    render() {
        return (
            <div>
                <br/>
                <h2>Liste aller aktuellen Nutzer</h2>
                <Col md="12">
                    <Alert variant="danger" show={this.state.error} >
                        Abfrage an alle Users ist fehlgeschlagen
                    </Alert>
                </Col>
                <Table hidden={this.state.error} striped bordered hover>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>E-Mail</th>
                        <th>Vorname</th>
                        <th>Nachname</th>
                        <th>Street</th>
                        <th>Hausnummer</th>
                        <th>Postleitzahl</th>
                        <th>Login Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderTable()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default GetUsersAdmin
