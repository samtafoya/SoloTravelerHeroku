import React, { Component } from 'react';

class Test extends Component {
    
    constructor() {
        super();
        this.state = {
            hello: 'hi'
        };
    } 

    getHello = () => {
        // Get the passwords and store them in state
        fetch('/api/getHello')
            .then(res => res.json())
            .then(this.setState({ hello: "hello" }));
    }

    render() {
        return (
            <div>
                <h1>Test Page!</h1>
                <button onClick={this.getHello}>call get hello</button>
                {this.state.hello}
            </div>
        );
    }
}

export default Test;