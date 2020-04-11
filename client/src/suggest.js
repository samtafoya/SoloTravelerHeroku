import React, { Component } from 'react';
import './login.css';

class Suggest extends Component {

    constructor() {
        super();
        this.state = {
            userList: []
        };
    }

    callApi = async () => {
        console.log("inside callApi()");

        var urlGetUsers = "http://ec2-13-56-181-190.us-west-1.compute.amazonaws.com:3000/api/users";

        const responseT = await fetch(urlGetUsers);
        const body = await responseT.json();
        //debugger;
        if (responseT.status === 200) {
            console.log("callApi() succeeded");
        }
        else {
            console.log("callApi() failed");
            var errMsg = "ERROR: callApi() failed: (response.status===" + responseT.status + ") " + body.message;
            throw Error(errMsg);
        }
        return body;
    };

    handleSubmit = () => {
        this.callApi()
            .then(res => {
                console.log("Hello: Inside 'handleSubmit.then'" + JSON.stringify(res[1]));

                let result = "";
                let resultList = [];
                let resultListTwo = [];
                let userA = [];
                let nameA = [];
                let bodyA = [];

                for (var i in res) {
                    result = JSON.stringify(res[i]);
                    let front = result.indexOf(":") + 2;
                    // let tempStr = result.substring(front);
                    // let back = result.indexOf(",") + 1;
                    let newSub = result.substring(front);
                    let sub = newSub.substring(0, newSub.length - 2);
                    resultList.push(sub + "\n      ");
                }

                this.setState({ userList: resultList });
                //console.log(" res " + this.state.userList[2]);

            })
        let thing =
            <div>
                <p>Success!</p>
            </div>

        this.setState({ success: thing });

    }

    render() {

        let newList = this.state.userList;

        return (
            <div>
                <button onClick={this.handleSubmit}>get users</button>
                <p> Here is a list of similar users:  </p>
                <div>
                    {newList.map(function (u, idx) {
                        return (<p key={idx}>{u}</p>)
                    })}
                </div>
                {this.state.success}
            </div >
        );
    }
}

export default Suggest;