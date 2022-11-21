import React from 'react';
import { Button } from 'react-bootstrap';
class ButtonLoader extends React.Component {

    constructor(props) {
        super(props);
        if(props.buttonClass) {
            this.state = {
                loading: props.loading,
                description: props.description,
                buttonClass: props.buttonClass
            }
        } else {
            this.state = {
                loading: props.loading,
                description: props.description,
                buttonClass: "primary"
            }
        }

    }


    render() {
        return (
            <div>
                <Button variant={this.state.buttonClass} className="buttonload btn-block" type="submit" disabled={this.props.loading}>
                    <i hidden={this.props.loading === false} className="fa fa-spinner fa-spin"></i> {this.state.description}
                </Button>
            </div>
        );
    }
}

export default ButtonLoader;