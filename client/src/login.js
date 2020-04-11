import React, { Component } from 'react';
import './login.css';

class Login extends Component {
    // State for passing data around
    constructor(props) {
        super(props)
        console.log("props " + JSON.stringify(this.props));

        this.state = {
            response: '',
            post: [],
            pass: '',
            first_name: '',
            last_name: '',
            age: '',
            responseToPost: '',
            success: '',
            isLoggedin: false,
            currentUser: '',
            trait: ''
        };
    }

    // Implementation of the "callApi" function 
    callApi = async () => {
        console.log("inside callApi()");
        var urlGetTrait = "http://ec2-13-56-181-190.us-west-1.compute.amazonaws.com:3000/api/login";
        const responseT = await fetch(urlGetTrait);
        const body = await responseT.json();
        var test = JSON.parse(body);
        if (responseT.status === 200) {
            console.log("callApi() succeeded");
        }
        else {
            console.log("callApi() failed");
            var errMsg = "ERROR: callApi() failed: (response.status===" + responseT.status + ") " + body.message;
            throw Error(errMsg);
        }
        return test;
    };

    /*
    getInfo() {
      console.log(this.state.email);
      this.callApi()
        .then(res => {
          console.log("Hello: Inside 'handleSubmit.then'");
  
          console.log(res);
        })
        .catch(err => {
          console.log("Hello: Inside 'handleSubmit.catch'")
          console.log(err);
        });
    }
    */

    handleSubmitTest = async e => {
        this.callApi()
    }

    // Implementation of the postback for the submit button click
    handleSubmit = async e => {
        e.preventDefault();

        //this.callApi()

        // determine if logged in or not
        if (!this.state.isLoggedin) {
            var submitUrl = "http://ec2-13-56-181-190.us-west-1.compute.amazonaws.com:3000/api/login";

            var data = {
                post: this.state.post,
                pass: this.state.pass,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                age: this.state.age,
                trait: this.state.trait
            };

            const response = await fetch(submitUrl, {
                method: 'POST',

                // need these headers for post
                headers: {
                    'Content-Type': 'application/json',
                },

                // thing entered in the form
                body: JSON.stringify(data)
            });

            //const body = await response.text();

            console.log(this.state.pass);

            let thing =
                <div>
                    <p>Success!</p>
                </div>

            this.setState({ success: thing });

            //this.setState({ responseToPost: body });
            //this.props.isLoggedin = true;
            this.setState({ isLoggedin: true });
            //this.getInfo();
            this.setState({ currentUser: this.state.post });
            console.log("states " + this.state.post + this.state.isLoggedin);
            //this.props.name = this.state.email;
            console.log(this.props.name);
            //  this.props.setName("sammi");
            // console.log("new" + this.props.name);
            this.testLocal();
        } else {
            let thing =
                <div>
                    <p>You are already logged in!</p>
                </div>

            this.setState({ success: thing });
        }

    };

    testLocal = () => {
        console.log("local storage");
        localStorage.setItem('nameVal', this.state.first_name + " " + this.state.last_name);
        localStorage.setItem('isLoggedin', "true");
        localStorage.setItem('emailVal', this.state.post);
        localStorage.setItem('traitVal', this.state.trait);
        console.log(localStorage.getItem('isLoggedin'));
        console.log("nameval " + localStorage.getItem('nameVal'));
    }

    test = async e => {
        console.log("testing");
        var submitUrl = "http://ec2-13-56-181-190.us-west-1.compute.amazonaws.com:3000/api/login";

        var data = {
            post: this.state.post,
            pass: this.state.pass,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            age: this.state.age,
            trait: this.state.trait
        };

        const response = await fetch(submitUrl, {
            method: 'POST',

            // need these headers for post
            headers: {
                'Content-Type': 'application/json',
            },

            // thing entered in the form
            body: JSON.stringify(data)
        }).then(
            //this.callSammi()
            this.testLocal()
        )
    }

    callSammi = () => (
        console.log("callSammi")
    )

    render() {
        return (
            <div className="Trait">
                <div>
                    <h1 class="testH">Login</h1>
                </div>
                <form>
                    <p>
                        <strong>Login:</strong>
                    </p>
                    <input type="text" placeholder="First Name" value={this.state.first_name} onChange={e => this.setState({ first_name: e.target.value })} />
                    <input type="text" placeholder="Last Name" value={this.state.last_name} onChange={e => this.setState({ last_name: e.target.value })} />
                    <input type="text" placeholder="Age" value={this.state.age} onChange={e => this.setState({ age: e.target.value })} />
                    <input type="email" placeholder="email" value={this.state.post} onChange={e => this.setState({ post: e.target.value })} />
                    <input type="text" placeholder="password" value={this.state.pass} onChange={e => this.setState({ pass: e.target.value })} />
                    <p><strong>Pick a word you relate to the most! (exactly as shown to help with matching)</strong></p>
                    <p>Hiking, Swimming, Biking, Socializing, Relaxing, Alone, Beaches, Mountains, City</p>
                    <input type="text" placeholder="trait" value={this.state.trait} onChange={e => this.setState({ trait: e.target.value })} />
                </form>
                <button onClick={this.test}>Test</button>

                {this.state.success}
            </div>
        );
    }
}

export default Login;