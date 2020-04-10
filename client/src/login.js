import React, { Component } from 'react';
import './login.css';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            hello: 'hi',
            success: ''
        };
    }

    getHello = () => {
        // Get the passwords and store them in state
        fetch('http://ec2-54-183-192-99.us-west-1.compute.amazonaws.com:3000/api/allposts')
            .then(res => res.json())
            .then(this.setState({ hello: "hello" }));
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
                <h1>Login Page!</h1>
                <div className="Trait">
                    <div>
                        <h1 class="testH">Login</h1>
                    </div>
                    <form>
                        <p>
                            <strong>Login:</strong>
                        </p>
                        <input type="text" placeholder="First Name"/>
                        <input type="text" placeholder="Last Name"/>
                        <input type="text" placeholder="Age"/>
                        <input type="email" placeholder="email"/>
                        <input type="text" placeholder="password"/>
                        <p><strong>Pick a word you relate to the most! (exactly as shown to help with matching)</strong></p>
                        <p>Hiking, Swimming, Biking, Socializing, Relaxing, Alone, Beaches, Mountains, City</p>
                        <input type="text" placeholder="trait"/>
                        <button type="submit" onClick={this.handleSubmit}>login</button>
                        {this.state.success}
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;