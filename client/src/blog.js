import React, { Component } from 'react';
import './blog.css';
import './App.css';

class Test extends Component {

    constructor() {
        super();
        this.state = {
            allList: [],
            userArr: [],
            nameArr: [],
            bodyArr: [],
            postList: [],
            success: '',
            blogText: "",
            textAreaVal: "",
            userV: '',
            nameV: '',
            numberOfLikes: ''
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
                            bodyA.push(subList[i].substring(subList[i].indexOf(":") + 2, subList[i].length - 1));
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
                        </div>);

                    /*
                        <div class="card-footer">
                                <a href="#" class="card-link" onClick={this.clicked}><i class="fa fa-gittip"></i> Contact this user! </a>
                                <a href="#" class="card-link"><i class="fa fa-gittip"></i>{localStorage.getItem('liked  ')}</a>
                        </div>
                    */
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

        var urlGetUsers = "http://ec2-13-56-181-190.us-west-1.compute.amazonaws.com:3000/api/allposts";

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

    handleSubmit = async e => {
        console.log("Inside Blog.handleSubmit")
        e.preventDefault();


        var submitUrl = "http://ec2-13-56-181-190.us-west-1.compute.amazonaws.com:3000/api/blog";

        console.log("nameval " + localStorage.getItem('nameVal'));

        var data = {
            blogText: this.state.textAreaVal,
            userV: localStorage.getItem('emailVal'),
            nameV: localStorage.getItem('nameVal')
        };

        const response = await fetch(submitUrl, {
            method: 'POST',

            // need these headers for post
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(data),
        });

        console.log("nameval " + localStorage.getItem('nameVal'));
        this.setState({ blogText: this.state.textAreaVal });

        const body = await response.text();

        this.setState({ blogText: this.state.textAreaVal });

        // fix key, count isnt working
        let newList = this.state.postList.concat(
            <div key={this.state.count} >
                <div class="card-header">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="ml-2">
                                <div class="h5 m-0">{localStorage.getItem('emailVal')}</div>
                                <div class="h7 text-muted">{localStorage.getItem('nameVal')}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <p class="card-text">{this.state.textAreaVal}</p>
                </div>
            </div>);

        this.setState({ postList: newList });

    };

    clicked = () => {
        console.log("clicked");
        this.setState({numberOfLikes: 'glad you liked me!'});
        this.state.numberOfLikes = 'glad you liked me!';
        console.log(this.state.numberOfLikes);
        localStorage.setItem('liked', "true");
    }

    // updates the blog post
    handleChange = (e) => {
        this.setState({
            textAreaVal: e.target.value
        });
        this.setState({ count: 1 });
    }

    render() {

        const { test } = this.state;
        const allList = this.state.allList;

        return (
            <div>
                <div>
                    <h1 class="test">Recent Posts</h1>
                </div>

                <div >
                    <a class="cardHead"> Make a publication</a>
                </div>

                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                        <div class="form-group">
                            <label class="sr-only" for="message">post</label>
                            <textarea class="form-control" id="message" rows="3"
                                placeholder="What are you thinking?" value={this.state.textareaVal} onChange={this.handleChange}></textarea>
                        </div>

                    </div>

                    <div class="btn-toolbar justify-content-between">
                        <div class="btn-group">
                            <button onClick={this.handleSubmit} type="submit" class="btn btn-primary">Submit</button>
                            {this.state.success}
                        </div>
                    </div>
                </div>

                {this.state.postList.reverse()}
                {allList.reverse()}

            </div>
        );
    }
}

export default Test;