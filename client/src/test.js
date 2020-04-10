import React, { Component } from 'react';

class Test extends Component {

    constructor() {
        super();
        this.state = {
            hello: 'hi',
            test: [],
            success: ''
        };
    }

    getHello = () => {
        // Get the passwords and store them in state
        fetch('http://ec2-54-183-192-99.us-west-1.compute.amazonaws.com:3000/api/allposts')
            .then(res => res.json())
            .then(test => this.setState({ test }))
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