import React, { Component } from 'react';
import './login.css';

class Suggest extends Component {

    constructor() {
        super();
        this.state = {

        };
    }

    handleSubmit = () => {
        let thing =
            <div>
                <p>Success!</p>
            </div>

        this.setState({ success: thing });

    }

    render() {
        return (
            <div>
                <button onClick={this.handleSubmit}>get users</button>
                <p> Here is a list of similar users:  </p>
                {this.state.success}
            </div>
        );
    }
}

export default Suggest;