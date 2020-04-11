import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Initialize state
  state = { passwords: [], hello: 'hi' }

  // Fetch passwords after first mount
  componentDidMount() {
    // this.getPasswords();
    //this.getHello();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch('/api/passwords')
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  }

  getHello = () => {
    // Get the passwords and store them in state
    fetch('/api/getHello')
      .then(res => res.json())
      .then(this.setState({ hello: "hello" }));
  }

  render() {
    const { passwords } = this.state;

    return (
      <div className>
        <h1 className="test">Welcome to SoloTravelers!</h1>
        <h2 className="headingTwo">Make sure you take a second to login so you can post to the blog and find similar users.</h2>
        <h2 className="smaller">Up until February 2019, I had only traveled with family and friends. I have always pre-booked my trips and stayed in hotels. When I went abroad to Australia I knew nobody. Of course I met people when I finally arrived but schedules do not always match up. I ended up just scheduling trips on my own, and making friends with locals and other travelers that I met in hostels. One group of travelers told me that they had met on a Facebook group page that was designed specifically for solo backpackers. It got me thinking about a more efficient ways to meet travel companions. This app is a one stop shop for solo travelers to find other people to travel with. The goal is to make it easy for users to find travel companions. Users will be able to view each other’s contact information, add specific traits that are unique to them, add specific qualities that they are looking for in other travelers, and have the ability to view posts from other travelers.</h2>
      </div>
    );
  }
}

export default App;