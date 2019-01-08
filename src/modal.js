import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div className="modal-container">
                <h1> Hello, {this.props.id}! </h1>
            </div>
        );
    }

}
