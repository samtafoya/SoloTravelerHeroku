import React, { Component } from 'react';

class Login extends Component {
    
    constructor() {
        super();
        this.state = {
            hello: 'hi'
        };
    } 

    getHello = () => {
        // Get the passwords and store them in state
        fetch('http://ec2-54-183-192-99.us-west-1.compute.amazonaws.com:3000/api/allposts')
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

export default Login;