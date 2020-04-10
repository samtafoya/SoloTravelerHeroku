import React, { Component } from 'react';

class Test extends Component {
    
    constructor() {
        super();
        this.state = {
            hello: 'hi',
            test: []
        };
    } 

    getHello = () => {
        // Get the passwords and store them in state
        fetch('http://ec2-54-183-192-99.us-west-1.compute.amazonaws.com:3000/api/allposts')
            .then(res => res.json())
            .then(test => this.setState({ test }))
            .then(console.log("test " + this.state.test))
            .then(console.alert("state " + this.state));
    }

    render() {

        const { test } = this.state;

        return (
            <div>
                <h1>Test Page!</h1>
                <button onClick={this.getHello}>call get hello</button>
               {this.state.test}
            </div>
        );
    }
}

export default Test;