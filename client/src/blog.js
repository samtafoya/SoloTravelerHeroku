import React, { Component } from 'react';
import './blog.css';

class Test extends Component {

    constructor() {
        super();
        this.state = {
            allList: [],
            userArr: [],
            nameArr: [],
            bodyArr: [],
            success: ''
        };
    }

    componentDidMount() {
        console.log("Inside Suggest.handleSubmit")

        this.callApi()
            .then(res => {
                console.log("Hello: Inside 'handleSubmit.then'" + JSON.stringify(res[2]));

                let result = "";
                let resultList = [];
                let resultListTwo = [];
                let userA = [];
                let nameA = [];
                let bodyA = [];

                for (var i in res) {
                    result = JSON.stringify(res[i]);
                    let front = result.indexOf("user") + 4;
                    let tempStr = result.substring(front);
                    let back = tempStr.indexOf(",") + 1;
                    let newSub = result.substring(front, back);
                    resultList.push(newSub + "\n      ");
                    let subList = result.split(",");
                    resultListTwo.push(subList[1]);

                    for (var i in subList) {
                        if (i == 1) {
                            userA.push(subList[i].substring(subList[i].indexOf(":") + 2, subList[i].length - 1));
                        } else if (i == 2) {
                            nameA.push(subList[i].substring(subList[i].indexOf(":") + 2, subList[i].length - 1));
                        } else if (i == 3) {
                            bodyA.push(subList[i].substring(subList[i].indexOf(":") + 2, subList[i].length - 2));
                        }
                    }
                }

                this.setState({ userArr: userA });
                console.log(this.state.userArr);

                this.setState({ nameArr: nameA });
                console.log(this.state.nameArr);

                this.setState({ bodyArr: bodyA });
                console.log(this.state.bodyArr);

                let nList = [];
                for (var i in this.state.userArr) {
                    nList = this.state.allList.concat(
                        <div key={i} >
                            <div class="card-header">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="ml-2">
                                            <div class="h5 m-0">{this.state.userArr[i]}</div>
                                            <div class="h7 text-muted">{this.state.nameArr[i]}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <p class="card-text">{this.state.bodyArr[i]}</p>
                            </div>
                            <div class="card-footer">
                                <a href="#" class="card-link"><i class="fa fa-gittip"></i> Like</a>
                                <a href="#" class="card-link"><i class="fa fa-comment"></i> Comment</a>
                                <a href="#" class="card-link"><i class="fa fa-mail-forward"></i> Share</a>
                            </div>
                        </div>);

                    this.setState({ allList: nList });
                }
            })
            .catch(err => {
                console.log("Hello: Inside 'handleSubmit.catch'")
                console.log(err);
            });
    }

    callApi = async () => {
        console.log("inside callApi()");

        var urlGetUsers = "http://ec2-54-183-192-99.us-west-1.compute.amazonaws.com:3000/api/allposts";
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

    ignoreMe = async e => {
        console.log("Inside Suggest.handleSubmit")
        e.preventDefault();

        this.callApi()
            .then(res => {
                console.log("Hello: Inside 'handleSubmit.then'" + JSON.stringify(res[2]));

                let result = "";
                let resultList = [];
                let resultListTwo = [];
                let userA = [];
                let nameA = [];
                let bodyA = [];

                for (var i in res) {
                    result = JSON.stringify(res[i]);
                    let front = result.indexOf("user") + 4;
                    let tempStr = result.substring(front);
                    let back = tempStr.indexOf(",") + 1;
                    let newSub = result.substring(front, back);
                    resultList.push(newSub + "\n      ");
                    let subList = result.split(",");
                    resultListTwo.push(subList[1]);

                    for (var i in subList) {
                        if (i == 1) {
                            userA.push(subList[i].substring(subList[i].indexOf(":") + 2, subList[i].length - 1));
                        } else if (i == 2) {
                            nameA.push(subList[i].substring(subList[i].indexOf(":") + 2, subList[i].length - 1));
                        } else if (i == 3) {
                            bodyA.push(subList[i].substring(subList[i].indexOf(":") + 2, subList[i].length - 2));
                        }
                    }
                }

                this.setState({ userArr: userA });
                console.log(this.state.userArr);

                this.setState({ nameArr: nameA });
                console.log(this.state.nameArr);

                this.setState({ bodyArr: bodyA });
                console.log(this.state.bodyArr);

                let nList = [];
                for (var i in this.state.userArr) {
                    nList = this.state.allList.concat(
                        <div key={i} >
                            <div class="card-header">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="ml-2">
                                            <div class="h5 m-0">{this.state.userArr[i]}</div>
                                            <div class="h7 text-muted">{this.state.nameArr[i]}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <p class="card-text">{this.state.bodyArr[i]}</p>
                            </div>
                            <div class="card-footer">
                                <a href="#" class="card-link"><i class="fa fa-gittip"></i> Like</a>
                                <a href="#" class="card-link"><i class="fa fa-comment"></i> Comment</a>
                                <a href="#" class="card-link"><i class="fa fa-mail-forward"></i> Share</a>
                            </div>
                        </div>);

                    this.setState({ allList: nList });
                }
            })
            .catch(err => {
                console.log("Hello: Inside 'handleSubmit.catch'")
                console.log(err);
            });
    };

    getHello = async () => {
        // Get the passwords and store them in state
        let test = await fetch('http://ec2-54-183-192-99.us-west-1.compute.amazonaws.com:3000/api/allposts');
        fetch('http://ec2-54-183-192-99.us-west-1.compute.amazonaws.com:3000/api/allposts')
            .then(res => res.json())
            .then(test => this.setState({ test }))
        console.log("testing " + JSON.stringify(this.state));
        console.log("api " + JSON.stringify(test));
        debugger;
    }

    handleSubmit = () => {
        let thing =
            <div>
                <p>Success!</p>
            </div>

        this.setState({ success: thing });

    }

    render() {

        const { test } = this.state;
        const allList = this.state.allList;

        return (
            <div>
                <div>
                    <h1>MY FEED</h1>
                </div>

                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab"
                                aria-controls="posts" aria-selected="true">Make
            a publication</a>
                        </li>
                    </ul>
                </div>

                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                        <div class="form-group">
                            <label class="sr-only" for="message">post</label>
                            <textarea class="form-control" id="message" rows="3"
                                placeholder="What are you thinking?"></textarea>
                        </div>

                    </div>

                    <div class="btn-toolbar justify-content-between">
                        <div class="btn-group">
                            <button onClick={this.handleSubmit} type="submit" class="btn btn-primary">Submit</button>
                            {this.state.success}
                        </div>
                    </div>
                </div>

                {allList}

            </div>
        );
    }


    /*
    render() {

        const { test } = this.state;

        return (
            <div>
                <h1>Test Page!</h1>
                <button onClick={this.getHello}>call get hello</button>
            </div>
        );
    }
    */
}

export default Test;